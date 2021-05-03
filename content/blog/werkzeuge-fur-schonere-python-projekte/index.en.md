---
title: " Werkzeuge für schönere Python-Projekte"
summary: Dieser Blog-Beitrag skizziert den aktuellen Setup von pre-commit hooks,
  statischer Code-Analyse-Tools (Flake8, Black) und Abhängigkeitsmanagement
  (setuptools, pip-tools) für Python-Projekte bei geOps.
author: Milan Oberkirch
cover: /images/blog/werkzeuge-fur-schonere-python-projekte/Python.png
created: 2020-11-17
slug: werkzeuge-fur-schonere-python-projekte
tags:
  - developers
  - python
published: true
---

Für die meisten dieser Tools gibt es auch Alternativen. Die hier genannten ließen sich am einfachsten in unsere bestehenden Worflows integrieren.

## Style-Guides

Die älteren unter uns werden sich noch an endlose Diskussionen erinnern, in denen Tab-Einrückungen oder die Art der Anführungszeichen bei Strings mit religiösem Eifer ausgefochten wurden.

[PEP-8](https://www.python.org/dev/peps/pep-0008/) beendet schon seit fast zehn Jahren viele solcher Diskussionen, aber wirklich los wird man sie erst, wenn ein Linter wirklich keine zwei Möglichkeiten zulässt den gleichen Code zu schreiben.

Hier kommt [Black](https://github.com/psf/black) ins Spiel:

> Black is the uncompromising Python code formatter. By using it, you agree to cede control over minutiae of hand-formatting. In return, Black gives you speed, determinism, and freedom from pycodestyle nagging about formatting. You will save time and mental energy for more important matters.

Für ein Team von ansonsten diskussionsfreudigen Entwicklern ist das wirklich ein Segen.

Black hat allerdings einen blinden Fleck, wenn es um unnötige aber valide Statements geht: nicht verwendete Variablen, unnötige Imports et cetera. Dafür braucht man dann doch noch einen Linter wie `flake8`, dem man im Zweifel aber auch per

    .filter(column == True)  # NOQA: SQLAlchemy

zu verstehen geben kann: Ja, das soll so.

Mitunter kommt es vor, dass flake8 und Black unterschiedlicher Auffassung sind. Black ist hier absolut kompromisslos:

> While Black enforces formatting that conforms to PEP 8, other tools may raise warnings about Black's changes or will overwrite Black's changes. A good example of this is isort. Since Black is barely configurable, these tools should be configured to neither warn about nor overwrite Black's changes.

Bei `flake8` empfiehlt sich folgende Ergänzung in der `.flake8` oder `setup.cfg`:

    [flake8]
    max-line-length = 88
    extend-ignore = E203

Für andere Tools gibt es in der [Black-Dokumentation Konfigurationsvorschläge](https://github.com/psf/black/blob/master/docs/compatible_configs.md#black-compatible-configurations).

### Darker: Black auf Änderungen beschränken

Wenn die Einführung von Black zu viel Chaos bedeuten würde (insbesondere bei größeren Projekten mit mehreren Maintainern), kann [Darker](https://github.com/akaihola/darker/) sich auf neuen oder geänderten Code beschränken.

Grundsätzlich gilt aber natürlich auch hier [PEP 8](https://www.python.org/dev/peps/pep-0008/):

> A style guide is about consistency. Consistency with this style guide is important. Consistency within a project is more important. Consistency within one module or function is the most important.

In anderen Worten: auch Darker sollte nur dort zum Einsatz kommen, wo es keine zusätzliche Inkonsistenz zum bestehenden Code erzeugt. Bisher kommt Darker bei und nicht zum Einsatz, da wir die Einführung von Black bisher gut koordinieren konnten.

## Abhängigkeitsmanagement

### pip-tools

[`pip-tools`](https://github.com/jazzband/pip-tools/) kann Abhängigkeiten aus einer `setup.py` (oder `setup.cfg`) extrahieren und in einer `requirements.txt` einfrieren.

Das ist sinnvoll um die Liste der direkten Abhängigkeiten in der `setup.py` klein zu halten und die verwendeten Versionen in der Git-History festzuhalten.

Unser setup ist hier im wesentlichen wie bei [GitHub dokumentiert](https://github.com/jazzband/pip-tools/), insbesondere nutzen wir auch die `dev-requirements.in` um nicht nur Installationsabhängigkeiten, sondern auch Entwickler-Tools einfach installierbar zu machen.

Neben Framework-spezifischen Tools stellt folgendes die Basis einer `dev-requirements.in` dar:

    -c requirements.txt
    flake8
    pytest
    pre-commit
    pip-tools
    black

Wenn man bei uns ein bestehendes Python-Repository klont sind die ersten Schritte also in der Regel:

    python3 -m venv venv
    venv/bin/pip install -r requirements.txt -r dev-requirements.txt
    venv/bin/pre-commit install

### renovate-bot

Der `renovate-bot` wird zwar im Repo konfiguriert aber wie der Name suggeriert auf dem GitLab-Server ausgeführt. Indirekt sorgt er vor allem für eine gute Code-Coverage in den Unittests da er ständig Dinge kaputt macht und -- wenn man das nicht in den Unittests merkt -- auch automatisch mergen kann.

Wir haben auto-merges für Minor Versions aktiviert, man kann das auch ganz abstellen, dann bekommt man aber sehr viele Merge Requests.

Trotz der zusätzlichen Arbeit ist dieser oder ein ähnlicher Bot unerlässlich um zu verhindern, dass ein Repository schleichend nicht mehr wartbar oder unsicher wird.

## Pre-Commit hooks

Pre-commit hooks sind kleine Programme, in der Regel Shell-Scripts, die von Git vor einem Commit ausgeführt werden. Man kann sie verwenden um Validierungen durchzuführen und den Commit gegebenenfalls abzubrechen.

Das [`pre-commit`](https://pre-commit.com/) Python-Paket stellt ein solches Programm bereit mit dem sich eine Reihe von Validierungen konfigurieren lässt. Da die Konfigurationsdatei im Repository liegt können alle Entwickler die gleichen Standards befolgen (erzwungen wird es per GitLab-CI).

Da die [Website](https://pre-commit.com/) wohl immer aktueller sein wird als ein Blog-Post will ich hier die hervorragende Dokumentation nicht wiederholen.

### Unsere Beispielkonfiguration (`.pre-commit-config.yaml`):

```yaml
fail_fast: true
repos:
- repo: https://github.com/pre-commit/pre-commit-hooks
  rev: master
  hooks:
    - id: no-commit-to-branch
    - id: check-merge-conflict
    - id: check-symlinks
    - id: mixed-line-ending
      args: ['--fix=no']
    - id: check-ast
    - id: check-builtin-literals
    - id: check-case-conflict
    - id: check-docstring-first
- repo: https://github.com/asottile/pyupgrade
  rev: master
  hooks:
    - id: pyupgrade
      args: [--py37-plus]
- repo: local
  hooks:
    - id: black
      name: black
      entry: black
      language: python
      files: '.*\.py$'
    - id: flake8
      name: flake8
      entry: flake8
      language: python
      pass_filenames: false
```

### Lessons learned

In der [Quick-Start-Anleitung](https://pre-commit.com/#2-add-a-pre-commit-configuration) wird Black direkt vom Repository eingebunden. Das ist nicht verkehrt, wenn man die `rev` auf eine bestimmte Version pinnt und nicht zusätzlich über die `dev-requirements.txt` installiert. Um die Version aktuell und konsistent zu halten, haben wir uns entschieden Black und Flake8 immer im lokalen `venv` zu installieren und so auch anderen Tools die selbe Version bereitzustellen.

In der `.pre-commit-config.yaml` wird mit `repo: local` der Befehl in `entry` lokal ausgeführt. Das funktioniert also nur mit aktivem `venv`.

## Ausblick: Type Annotations

Die oben beschriebenen Tools und Anpassungen lassen sich mit überschaubarem Aufwand auch auf bestehende Projekte anwenden. Die Einführung von Type Annotations ist jedoch immer mit sorgfältiger Handarbeit verbunden.

Bei bestehenden Projekten verwenden wir die Semantik aus [PEP 484](https://www.python.org/dev/peps/pep-0484/) vor allem für neuen Code und als Dokumentation.

Bei neuen Projekten kann man dann noch einen Schritt weiter gehen und mit Tools wie [Mypy](http://mypy-lang.org/) oder [pyright](https://github.com/Microsoft/pyright) die Annotationen nutzen um ganze Fehlerklassen automatisch zu erkennen und zu unterbinden.
