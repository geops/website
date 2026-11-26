---
title: "Sandboxing AI Agents: Wie wir bei geOps Lima einsetzen"
summary: Agentic Coding ist im Laufe des Jahres zentraler Teil der Arbeit
  geworden. Wir verwenden Lima um mithilfe unserer AI Agents sicher in einer
  Sandbox entwickeln zu können.
author: Milan Oberkirch, Tobias Kronauer
created: 2026-11-26
slug: sandboxing-ai-agents-wie-wir-bei-geops-lima-einsetzen
published: true
---
# Sandboxing AI Agents: Wie wir bei geOps Lima einsetzen

AI Coding Agents haben weitreichende Möglichkeiten: Sie können Dateien lesen und verändern, Shell-Kommandos ausführen, Pakete installieren und auf externe Dienste zugreifen. Damit wird ein Coding Agent praktisch zu einem automatisierten Benutzer auf dem eigenen Rechner ohne Kontrolle.

Mittlerweile etabliert sich dazu ein Standard: Sandboxing. Dies dient dazu den Agent weitgehend vom Host zu isolieren, damit der Blast Radius eingeschränkt wird. Bei geOps setzen wir auf **[Lima](https://lima-vm.io/)** als MicroVM. Warum? Das erklären wir in diesem Artikel.

Zuerst erklären wir, warum Sandboxing für AI Agents zwingend erforderlich ist. Anschliessend vergleichen wir verschiedene Sandboxing-Ansätze und geben abschliessend einen Einblick, wie wir Lima bei uns im Unternehmen verwenden.

## Motivation zum Sandboxing

Ein Sandboxing begrenzt die Fähigkeiten eines AI Agents auf eine kontrollierte Umgebung:

* **Das Hostsystem wird geschützt.** Der Agent führt versehentlich `rm -rf /tmp/*` oder einen fehlerhaften `sudo`-Befehl aus. Diese Zugriffe werden durch die Sandbox untersagt.
* **Die Credentials werden isoliert.** Der Agent soll einen Bug beheben und findet dabei `~/.ssh/id_ed25519` oder einen AWS-Token. Ohne Sandbox könnte er diese Dateien lesen oder versehentlich in Logs bzw. Code übernehmen. Auch mit verschlüsselten SSH-Keys teilt sich der KI-Agent den SSH-Agent mit dem Nutzer.
* **Der Dateizugriff wird begrenzt.** Der Agent arbeitet an `~/repos/project-a`, versucht aber beispielsweise `find ~ -type f` auszuführen. Die Sandbox kann verhindern, dass er auf vertrauliche Dateien zugreift.
* **Der Netzwerkzugriff wird kontrolliert.** Ein Agent installiert eine Dependency oder führt ein unbekanntes Script aus. Ohne Einschränkung könnte dieses Script beliebige externe Server kontaktieren oder Daten übertragen.
* **Supply-Chain-Risiken wirken sich nicht auf den Host aus.** Der Agent führt `npm install`, `pip install` oder ein Build-Script aus. Eine kompromittierte Dependency könnte versuchen, auf das restliche System oder vorhandene Credentials zuzugreifen.

Mittlerweile gibt es eine Vielzahl von Sandboxing-Lösungen, sowohl in den Harness integriert als auch separat. Das Entwicklungsstadium ist unterschiedlich weit fortgeschritten. Nachfolgend wollen wir diese Sandboxing-Ansätze vergleichen.

## Vergleich der Sandboxing-Ansätze

Nachfolgend sind die Arten der Sandboxes strukturiert, je nach Isolationslevel. In den letzten zwei Spalten ist eine subjektive Einordnung in die Güte der Developer Experience (DX) und des Sicherheitslevels zu finden. Eine schlechte DX kann auch zu weniger Sicherheit führen, da sich hier schnell unsichere Workarounds einschleiche

| **Art der Sandbox**           | **Beispiel**                  | **Filesystem**                              | **Network**                            | **Credentials**                              | **Privilges**                                    | **DX**                                                                                                       | **Sicherheitslevel**                                                                                         |
| ----------------------------- | ----------------------------- | ------------------------------------------- | -------------------------------------- | -------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Permission / Tool Sandbox** | OpenCode Permissions          | Zugriff pro Tool/Pfad geregelt              | Meist nicht technisch eingeschränkt    | Meist nicht automatisch geschützt            | Meist keine Einschränkung                        | 🟢 Sehr gut                                                                                                  | ![(Fehler)](https://confluence.geops.com/s/hdl3h0/9012/1phy4ty/_/images/icons/emoticons/error.svg)  Schlecht |
| **OS-Level Sandbox**          | nono                          | Explizit freigegebene Pfade                 | Kann eingeschränkt werden              | Nicht freigegebene Dateien nicht erreichbar  | Kann über OS-Mechanismen eingeschränkt werden    | 🟡 Mittel (Programme scheitern an ungewohnter Umgebung)                                                      | 🟢 Gut                                                                                                       |
| **Container**                 | Docker, Podman                | Separate Ordnerstruktur, ausgewählte Mounts | Eigenes direkt verbundenes Netzwerk    | Nur explizit weitergereichte Credentials     | Container-Privileges können eingeschränkt werden | 🟡 Mittel                                                                                                    | 🟢 Gut                                                                                                       |
| **MicroVM (VM-Wrapper)**      | Firecracker, Docker sbx, Lima | Separates Filesystem, Netzwerk-Mounts       | Eigenes Netzwerk mit virtuellem Router | Nur explizit weitergereichte Credentials     | Wie getrennter PC im gleichen LAN                | 🟢 Gut                                                                                                       | 🟢 Gut                                                                                                       |
| **VM**                        | QEMU, VMware, VirtualBox      | Separates Filesystem, Netzwerk-Mounts       | Eigenes Netzwerk mit virtuellem Router | Host-Credentials nicht automatisch verfügbar | Wie getrennter PC im gleichen LAN                | ![(Fehler)](https://confluence.geops.com/s/hdl3h0/9012/1phy4ty/_/images/icons/emoticons/error.svg)  Schlecht | 🟢 Sehr gut                                                                                                  |
| **Remote Sandbox**            | E2B                           | Remote Filesystem / Workspace               | Vom lokalen System getrennt            | Host-Credentials nicht automatisch verfügbar | Kein direkter Zugriff auf lokalen Host           | ![(Fehler)](https://confluence.geops.com/s/hdl3h0/9012/1phy4ty/_/images/icons/emoticons/error.svg)  Schlecht | 🟢 Sehr gut                                                                                                  |



Grob gibt es dabei sechs Varianten von Sandboxes:

| **Art der Sandbox**           | **Prinzip**                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Permission / Tool Sandbox** | Der Harness entscheidet, welche Aktionen der Agent ausführen darf.                                                                                                                     |
| **OS-Level Sandbox**          | Betriebssystemmechanismen wie **Landlock, Bubblewrap oder Seatbelt** begrenzen einen Prozess.                                                                                          |
| **Container**                 | Der Agent läuft in einem Container mit eigenem Filesystem, Netzwerk-Namespace und eingeschränkten Linux-Rechten.                                                                       |
| **MicroVM**                   | Der Agent läuft in einer virtuellen Maschine, die für die Entwicklung vorkonfiguriert ist und Tooling für gezielte Freigaben mitbringt; z.B. **Firecracker**, **Docker sbx**, **Lima** |
| **VM**                        | Der Agent läuft in einer virtuellen Maschine ohne auf den Use-Case spezialisiertes Tooling; z.B. **VirtualBox**, VMWare, QEMU.                                                         |
| **Remote Sandbox**            | Die komplette Ausführungsumgebung befindet sich auf einem anderen Rechner bzw. in der Cloud.                                                                                           |

# Lima

Lima ist eine MicroVM-Lösung, die ursprünglich darauf spezialisiert war Linux-Container in MacOS zur Verfügung zu stellen. Als Sandbox für die Entwicklung in einer isolierten Umgebung eignet es sich neben der guten Host-Integration besonders wegen der Möglichkeit, ein gemeinsames, vorkonfiguriertes [Template](https://lima-vm.io/docs/templates/) zu verwenden, das allen Entwicklern im Team zur Verfügung gestellt wird.

Das ermöglicht uns den Einstieg in neue Projekte stark zu vereinfachen: Statt unterschiedliche Betriebssysteme zu unterstützen, können wir bei internem Tooling jetzt von einer homogenen Basis ausgehen.

Was wir damit nicht abdecken ist ein Credential-Proxy bzw. Gateway, um in der VM mit externen Credentials authentifiziert zu sein. Meiner persönlichen Einschätzung nach würde das aber auch ein falsches Gefühl von Sicherheit vermitteln. Stattdessen müssen bei uns für die Verwendung in der VM eigene Credentials erstellt werden und so eingeschränkt sein, dass eine Veröffentlichung keinen großen Schaden anrichten kann. Read-only API-Keys zu [unseren APIs](https://developer.geops.io/) sind fein, Deployment-Tokens aber ein absolutes No-Go.

Beim Vergleich mit anderen Lösungen hat uns vor allem der Filesystem-Sync bzw. Mount überzeugt: Sowohl unter Linux als auch MacOS werden Dateien in konfigurierten Pfaden transparent zur Verfügung gestellt, der Pfad ist also innen und außen der selbe. Dabei hat man die Wahl zwischen einem Mount (bei Linux per default über sshfs, wir verwenden 9p) oder manuellen Syncs.

## Verwendung bei geOps

Wir verwenden für in Lima verfügbare Dateien einen eigenen Ordner, im folgenden "Workspace" genannt, in den Repositories für die Entwicklung mit LLMs gecloned werden. Dieser Ordner wird in Lima gemounted und der Inhalt ist daher von außen als potentiell komprimiert zu betrachten.

Um Dateien in Lima verfügbar zu machen, können sie also in diesen Ordner verschoben werden, bei lokalen Dateien bietet sich hier entweder ein Unterordner für alles oder in jedem Repository an. So kann man z.B. sein Harness per AGENTS.md anweisen lokale Dateien in `./local/`  zu legen und dort eine `.gitignore`  mit "*" hinterlegen lassen.

Nach Code-Änderung in Lima und prüfen des diffs außerhalb der VM kann man dann, ebenfalls von außerhalb der VM, Änderungen ganz normal pushen.

Damit wir nicht alle an die exakt gleichen Werte gebunden sind, haben wir noch ein bootstrap-Script, das manche Werte im Template vor der Anwendung ersetzt.

## Lima Templates

Es gibt bereits eine Vielzahl vom Lima-Templates, die sich für den Einstieg eigenen.

Davon, mit einem "limactl template copy" zu starten, muss ich leider abraten: Das führt zu einer VM, in der das komplette Home-Verzeichnis gemountet werden kann.

Initial ist das schon recht aufwändig, ersetzt dann aber das Aufsetzen einer eigenen Entwicklungsumgebung pro VM.

Das kleinste mögliche Template legt nur eine Basis fest:

```yaml
minimumLimaVersion: "2.0.0"

base:
  - template:_images/ubuntu-24.04`
```

### mount

Um den Workspace zu mounten fügt man dann "mounts" hinzu:

```yaml
mounts:
  - location: "~/workspace"
    mountPoint: "/workspace"
    writable: true
```

Das mounted den Workspace aber zu `/workspace` und nicht transparent zum richtigen User-Verzeichnis in der VM. Man kann das beim erstellen der VM per `--set`  übersteuern:

`limactl start --set ".mounts[0].location = \"$HOST_WORKSPACE\"" --set ".mounts[0].mountPoint = \"$HOST_WORKSPACE\""`

Ab hier bietet es sich dann an, den `start` -Befehl mit einem Bootstrap-Script zu bauen.

### provision

Wirklich nützlich wird das Template, wenn wir einmal sämtliche Tools und Libraries, die wir üblicherweise verwenden, automatisch installieren und einrichten.

Dafür gibt es zwei Modi, "system" und "user", die erwartungsgemäß einmal als Root und einmal als "Gast-Nutzer" ausgeführt werden.

Hier ein Beispiel mit Auszügen aus unserem Template, bei dem Cache-Pfade in den Workspace-Ordner verlegt werden (was bei uv und pnpm alles viel schneller macht, das Hardlinks ermöglicht):

```yaml
provision:
  - mode: system
    script: |
      #!/bin/bash
      set -euxo pipefail
      export DEBIAN_FRONTEND=noninteractive
 
      apt-get update
      apt-get install -y --no-install-recommends \
          build-essential \
          curl
 
      cat >/etc/profile.d/geops-env.sh <<'EOF'
      export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
      export UV_MANAGED_PYTHON=1
      export PNPM_HOME="$HOME/.local/share/pnpm"
      export PATH="$PNPM_HOME:$PATH"
 
      workspace_root="$(findmnt -rn -t 9p,virtiofs,fuse.sshfs,sshfs -o TARGET | head -n1 || true)"
      if [ -n "$workspace_root" ] && [ -d "$workspace_root" ] && [ -w "$workspace_root" ]; then
        mkdir -p "$workspace_root/.cache/uv" "$geops_workspace_root/.cache/pnpm/store" 2>/dev/null || true
        export LIMA_WORKSPACE_ROOT="$workspace_root"
        export UV_CACHE_DIR="$workspace_root/.cache/uv"
        export npm_config_store_dir="$workspace_root/.cache/pnpm/store"
      fi
      EOF
      chmod 0644 /etc/profile.d/geops-env.sh
 
  - mode: user
    script: |
      #!/bin/bash
      set -euxo pipefail
      workspace_root="$(findmnt -rn -t 9p,virtiofs,fuse.sshfs,sshfs -o TARGET | head -n1 || true)"
      if [ -n "$workspace_root" ] && [ -d "$workspace_root" ] && [ -w "$workspace_root" ]; then
        mkdir -p "$workspace_root/.cache/uv" "$workspace_root/.cache/pnpm/store"
      fi
```

Wie man sieht, kann man an der Stelle beliebigen Code ausführen. Um für Nutzer spezifische Werte zu setzen, schreiben wir die im Template hart codiert z.B. als "**HOST_GIT_USER_NAME**" und ersetzen sie dann im Bootstrap-Script:

```yml
tmp_template=$(mktemp "${TMPDIR:-/tmp}/lima-geops.XXXXXX.yaml")
trap 'rm -f "$tmp_template"' EXIT
python3 - "$TEMPLATE" "$tmp_template" "$INSTALL_JJ_FLAG" "$HOST_GIT_USER_NAME" "$HOST_GIT_USER_EMAIL" <<'PY'
from pathlib import Path
import shlex
import sys
src = Path(sys.argv[1]).read_text()
src = src.replace('__INSTALL_JJ__', sys.argv[3])
src = src.replace('__HOST_GIT_USER_NAME__', shlex.quote(sys.argv[4]))
src = src.replace('__HOST_GIT_USER_EMAIL__', shlex.quote(sys.argv[5]))
Path(sys.argv[2]).write_text(src)
PY
```

## Verwendung

### Autostart

Um die VM immer griffbereit zu haben, bietet es sich an, sie per "`limactl autostart enable default`" beim Login automatisch zu starten.

### Harnesses und Agents

Installation und Setup für Harnesses gehören in den "provision"-Schritt des Templates. Damit ist die Nutzung auf der Kommandozeile denkbar einfach:

* "lima pi"
* "lima opencode"
* ...

"lima" öffnet ohne weiter Argumente einfach eine Shell. Es funktionieren auch komplexere Befehle wie

* `lima uv run --with prek prek run --files pyproject.yaml` 
* `lima VIRTUAL_ENV=.venv python --version` 

### Als SSH-Remote in Editoren

Wer nicht auf der Kommandozeile entwickelt, kann die Lima VM auch als "remote" in einem Editor verwenden.

In der "~/.ssh/config" auf dem Host fügt man hierzu folgende Zeile hinzu:

`Include ~/.lima/*/ssh.config`

Die erste erstellte VM heißt per default "lima-default" und kann bei

* VS Code per "Remote Explorer" Extension und
* Zed per "Remote-SSH" GUI oder `zed -r ssh-remote+lima-default <pfad-innerhalb-der-vm>`

verknüpft werden.

## Fazit

Es lohnt sich mit der Vorgabe, dass LLMs nur in isolierten Umgebungen verwendet werden dürfen auch gleich das Tooling mit zu geben, dass es damit unterm Strich die Entwicklung für alle vereinfacht.

Wichtig ist aber auch der Hinweis, dass der Komfort einer MicroVM auch eigene Risiken mitbringt: So kann ein Prozess in der VM Dateien im Workspace beliebig erstellen und verändern. Dafür muss sensibilisiert werden!

Insgesamt haben wir mit den Vorgaben und dem Lima-Template aber einen guten Mittelweg zwischen Sicherheit und Komfort gefunden.