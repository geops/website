---
title: Python-Abhängigkeiten verwalten mit uv
summary: Ein kurzer Überblick, wie der Umstieg auf uv unseren Python-Workflow
  verbessert hat – als schneller All-in-One-Ersatz für Tools wie pip, pip-tools
  und virtualenv. Inklusive Tipps zur Migration bestehender Projekte.
created: 2025-07-11
slug: modernes-python-tooling-mit-uv
published: true
---
Seit meinem letzten Blogpost über Python-Tooling vor etwa fünf Jahren hat sich einiges geändert. Neben der Einführung von Typannotationen sind wir von "black" und "flake8" zu "ruff" und von "pip" und "pip-tools" zu "uv" gewechselt. Beide Tools stammen von <https://astral.sh/> und haben sich als äußerst zuverlässig erwiesen. In diesem Blogpost konzentriere ich mich auf `uv`, das weit mehr ist als nur ein einfacher Ersatz.

#### Was ist uv?

`uv` behauptet, „ein einziges Tool zu sein, das `pip, pip-tools, pipx, poetry, pyenv, twine, virtualenv` und mehr ersetzt“, und dabei „10–100x schneller als pip“ zu sein. Ähnlich wie `ruff` kann es als Drop-in-Ersatz für die genannten Tools verwendet werden – so haben wir auch angefangen, als `pip-tools` in einigen Projekten keine reproduzierbaren Ausgaben mehr lieferte. Die Umstellung ist so einfach wie es klingt: `uv pip compile` statt `pip-compile`, und das passende Snippet aus <https://docs.astral.sh/uv/guides/integration/pre-commit/> in die `.pre-commit-config.yaml` kopieren.

Nach Armin Ronachers Vortrag über den Vorgänger von `uv` auf der EuroPython 2024 wurde ich daran erinnert, wie unnötig kompliziert das Management von Python-Abhängigkeiten oft noch ist – mit Kombinationen aus `dev-requirements.in`, `dev-requirements.txt`, `pyproject.toml` und README-Anleitungen zum Einrichten des virtuellen Environments. Das hat mich motiviert, `uv` (Nachfolger von Rye) nochmal anzuschauen.

Die Grundidee: Man kann mit `uv` alles erledigen – vom Erstellen der `pyproject.toml`, über das Hinzufügen von Abhängigkeiten (auch Entwicklungsabhängigkeiten), bis hin zum Veröffentlichen auf PyPI – ohne überhaupt ein venv aktivieren zu müssen. Der Einstieg ab Null ist sehr gut dokumentiert: <https://docs.astral.sh/uv/guides/projects/>. Andere Features als das Dependency Management sind in diesem Post nicht abgedeckt.

#### Umstieg auf uv bei bestehenden Projekten

Unser aktueller Kompromiss ist, `uv` lokal zu verwenden, aber im CI weiterhin ein Wheelhouse zu erzeugen. Hoffentlich wird `uv` das in Zukunft ebenfalls unterstützen.

- - -

**dev-requirements.in zu einer dependency-group verschieben**\
Statt zusätzliche Dateien für Entwicklungsabhängigkeiten zu pflegen, nutzt `uv` sogenannte dependency-groups direkt in der `pyproject.toml`. Für neue Projekte geht das einfach mit `uv add --dev <paket>`. Für bestehende Listen kann man die `pyproject.toml` direkt bearbeiten:

```
[dependency-groups]
dev = [
  "<whatever>",
]
```

Jetzt sind die dev-Abhängigkeiten bei `uv run` automatisch enthalten (z. B. `uv run pytest`), außer man schließt sie explizit aus (`uv run --no-dev pytest`).

Wichtig: Diese Gruppen sind keine „Extras“ im Sinne von optionalen Abhängigkeiten und haben außerhalb von `uv` keine Bedeutung. Sie dienen primär für interne Tools vor der Veröffentlichung (z. B. `pytest`, `pre-commit`, `mypy` etc.).

**Versionen übernehmen (pinned versions)**\
Um bereits festgelegte Versionen zu übernehmen, darf `uv` beim ersten Erstellen der `uv.lock`-Datei keine Updates durchführen. Eine direkte Möglichkeit dazu gibt es derzeit nicht – daher habe ich folgendes gemacht:

```
$ uv pip install pip wheel
$ uv run pip wheel -w wheels/ -r requirements.txt -r dev-requirements.txt setuptools
$ uv lock -f wheels/ --no-index
```

Falls `uv` sich über fehlende Pakete beschwert (z. B. `tzdata`), muss man diese manuell nachreichen:

```
$ uv run pip wheel -w wheels/ tzdata
$ uv lock -f wheels/ --no-index
```

Gratulation – sobald `uv` keine Fehler mehr anzeigt, ist die Lock-Datei mit den bisherigen Versionen erstellt.

**Pre-Commit- und CI-Konfiguration**

\
Dieser Teil ist wieder unkompliziert. Die Beispiele unter <https://docs.astral.sh/uv/guides/integration/pre-commit/>funktionieren in der Regel out-of-the-box. Hier ein reales Beispiel für ein Projekt, bei dem sich das Backend im Unterordner `backend/` befindet und ein Paket nicht auf PyPI liegt, weshalb die Hashes das CI-Wheelhouse zerstören würden:

```
- repo: https://github.com/astral-sh/uv-pre-commit
  rev: 0.7.18
  hooks:
    - id: uv-lock
      files: ^backend/(pyproject.toml|requirements.txt)$
      args: [--project, backend/]
    - id: uv-export
      files: ^backend/uv.lock$
      args: [--project, backend/, --no-dev, --output-file=backend/requirements.txt, --no-emit-workspace, --no-hashes]
    - id: uv-export
      files: ^backend/uv.lock$
      args: [--project, backend/, --only-dev, --output-file=backend/dev-requirements.txt, --no-emit-workspace, --no-hashes]
```

Wie man sieht, ist die `uv.lock`-Datei eigentlich alles, was wir für die Abhängigkeitsverwaltung brauchen. Die zusätzlichen Dateien könnten im CI neu generiert werden – vielleicht, wenn `uv` künftig selbst Wheelhouses oder Snapshots bauen kann.

- - -

**Warum das alles?**

Was mit einem einfachen Ersatz für `pip-tools` begann, hat sich zu einer deutlich besseren Developer Experience entwickelt: Statt aufwändiger Setup-Anleitungen zur Python-Version, virtuellen Umgebung und Paketinstallation, genügt bei einem Django-Projekt zum Beispiel Folgendes:

```
# after installing uv (https://docs.astral.sh/uv/getting-started/installation/):
createdb <default-database-name>
uv run manage.py migrate
uv run manage.py runserver
```