---
title: Testen von Bilddateiexporten mit Cypress in CI
summary: ""
slug: testing-file-exports-with-cypress-in-ci
---
Heute werden wir über Cypress sprechen. Genauer gesagt, wie man Canvas-Exporte in einem End-to-End-Testszenario (E2E) testet und wie man die Tests in sein CI integriert.

geOps-Webanwendungen verfügen häufig über Funktionen, die einen KArten-Canvas als Bild exportieren. [mapset](https://editor.mapset.ch/) ist eine dieser Funktionen, die es den Nutzern ermöglicht, situationsbezogene Karten für den öffentlichen Verkehr zu zeichnen und als PNG-Dateien zu exportieren. Als eine der komplexeren, aber essentiellen Funktionen von mapset ist sie auch anfällig für Fehler, wenn sich die App weiterentwickelt. Der Arbeitsablauf muss durch Nachbildung realer Benutzerszenarien in E2E-Tests getestet werden.

(https://www.cypress.io/) Cypress hat sich zur ersten Wahl für E2E-Tests in der Webentwicklung entwickelt, insbesondere für React-Apps. Es bietet eine Testschnittstelle zur  Simulation von Benutzerinteraktionen (z. B. eine Abfolge von Klicks oder anderen Ereignissen) und zum Starten des Tests in einer Webbrowser-Instanz im Headed- ([cypress open](https://docs.cypress.io/guides/guides/command-line.html#cypress-open)) oder Headless-Modus ([cypress run](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)). Der Headed-Modus bietet eine besser lesbare Testschnittstelle, die es Entwicklern ermöglicht, den Testablauf in einer Browser-Instanz in einer kontrollierten Cypress-Umgebung zu beobachten. Im Headless-Modus werden die Tests nur im Terminal ausgeführt.

Unser Szenario sieht folgendermaßen aus:

* Benutzer lädt Mapset und meldet sich an
* Ein zuvor gezeichneter Plan wird in die Karte importiert.
* Der Benutzer löst einen Canvas-Export aus.
* Die exportierte PNG-Datei sollte die Basiskarte und die Features aus der importierten Zeichnung enthalten.

![](/images/blog/testing-file-exports-with-cypress-in-ci/image1.png)

Um dieses Verhalten zu reproduzieren, starten wir programmatisch mapset, loggen uns ein, klicken auf den Canvas-Export-Button und prüfen, ob die heruntergeladene Datei mit einer vorbereiteten Vergleichsdatei identisch ist.

Zunächst starten wir mapset innerhalb von Cypress mit dem Paket [start-server-and-test](https://github.com/bahmutov/start-server-and-test), um einen Entwicklungsserver zu starten und Cypress im Headless-Modus auszuführen:

```bash
npm run start-server-and-test start http://localhost:3000 'cypress run --headless --browser chromium'
```

Oder für yarn:

```bash
yarn start-server-and-test start http://localhost:3000 'cypress run --headless --browser chromium'
```

Anschließend melden wir uns mit einem \[benutzerdefinierten Befehl] bei mapset an (https://docs.cypress.io/api/cypress-api/custom-commands.html). Der Code des benutzerdefinierten Befehls hängt vom Anmeldeprozess der App ab. In unserem Fall führen wir einen GET [request()](https://docs.cypress.io/api/commands/request.html) an den Login-Endpunkt aus und extrahieren ein [CSRF-Token](https://portswigger.net/web-security/csrf/tokens), das wir dann zusammen mit einer E-Mail und einem Passwort in den Body einer POST-Anfrage an den Login-Endpunkt einfügen. Die Werte für E-Mail und Passwort werden in Cypress in gitlab als Umgebungsvariablen übergeben. Beachten Sie, dass Cypress-Umgebungsvariablen großgeschrieben werden müssen.

Der resultierende Code sieht etwa so aus:

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_01.png)

Als nächstes müssen wir in unserem Test [visit()](https://docs.cypress.io/api/commands/visit.html) mapset aufrufen und einen Plan in die Karte laden. Im interaktiven Modus startet mapset eine GET-Anfrage an eine API im Backend, holt bei Erfolg eine KML-Datei und lädt sie in die Karte. Natürlich wollen wir dieses Verhalten in den Tests vermeiden, um sie backend-unabhängig zu machen. Glücklicherweise erlaubt uns Cypress, [stub](https://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html#Stubshttps://docs.cypress.io/guides/guides/stubs-spies-and-clocks.html#Stubs) Request Responses zu erstellen. Auf diese Weise können wir voreingestellte [fixtures](https://docs.cypress.io/api/commands/fixture.html) definieren, die von Anfragen an die Zeichen-API in jedem Test zurückgegeben werden.

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_02.png)

Nachdem wir den Plan korrekt in mapset geladen haben, lösen wir nun einen [click()](https://docs.cypress.io/api/commands/click.html) auf die Schaltfläche Canvas Export aus. Und genau hier beginnt der knifflige Teil: Standardmäßig erlauben Headless-Browser-Instanzen keine Downloads, was uns daran hindert, das heruntergeladene PNG zum Vergleich zu verwenden. Als Workaround haben wir eine Lösung verwendet, die in diesem [github issue](https://github.com/cypress-io/cypress/issues/949#issuecomment-666638986) vorgestellt wird. Zusammengefasst definiert sie benutzerdefinierte [Cypress-Plugins](https://docs.cypress.io/api/plugins/writing-a-plugin.html), die beim Start Argumente an die Instanz des Headless-Chromium-Browsers übergeben, so dass wir [Browser.setDownloadBehavior](https://vanilla.aslushnikov.com/?Browser.setDownloadBehavior) mit "allow" aufrufen und den Pfad zum gewünschten Download-Ordner angeben können.

So weit, so gut. Nun müssen wir das heruntergeladene PNG mit einem vorbereiteten Fixture PNG vergleichen, das identisch sein muss. Leider unterstützt Cypress [wait()](https://docs.cypress.io/api/commands/wait.html) nicht das Warten auf Ereignisse wie Dateidownloads, daher verwenden wir es mit einem festen Timeout, um sicherzustellen, dass der Dateidownload abgeschlossen ist. Anschließend verwenden wir [readFile()](https://docs.cypress.io/api/commands/readfile.html), um die Datei mit base64-Kodierung zu lesen und unsere Dateien zu vergleichen.

In unserem Test verwenden wir dann die benutzerdefinierte Aufgabe, um die Dateien zu vergleichen.

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_03.png)

Und voilà! Unsere Tests laufen und bestehen im Headless-Modus.

Um die Cypress-Tests in unserer gitlab-CI-Pipeline auszuführen, fügen wir eine Testphase in der Datei .gitlab-ci.yml hinzu. Hier stellen wir sicher, dass alle Cypress-Anforderungen und -Assets vorhanden sind, Cypress installiert ist und die Tests ausgeführt werden. Wie bereits erwähnt, werden die Anmeldedaten für das Mapset mit [gitlab-Umgebungsvariablen](https://docs.gitlab.com/ee/ci/variables/) übergeben.

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_04.png)

Zu unserer großen Bestürzung schlug unsere Pipeline während der Cypress-Testphase immer noch fehl, da unsere Tests zum Einfrieren der Chrome-Instanz führten. Nach einigen ernsthaften Nachforschungen und einer Menge Kaffee fanden wir den Schuldigen: Unsere Pipelines laufen in Docker-Containern mit einem Standard-Limit für den gemeinsamen Speicherplatz, der für die Verarbeitung großer Webinhalte in Chrome zu klein sein könnte. Wir lösten das Problem, indem wir `--disable-dev-shm-usage` zu den Chrome-Startoptionen hinzufügten, um den Engpass zu beseitigen, wie von Google empfohlen (siehe die [Google-Dokumentation](https://developers.google.com/web/tools/puppeteer/troubleshooting#tips)).

![](/images/blog/testing-file-exports-with-cypress-in-ci/code_05.png)

Und jetzt lehnen wir uns zurück, schnappen uns etwas Popcorn und sehen zu, wie die Pipeline die Tests reibungslos durchläuft.

Das war's für heute. Wir hoffen, dass unsere Bemühungen Ihnen bei Ihrer eigenen Cypress-Testautomatisierung helfen. Viel Spaß beim Kodieren!