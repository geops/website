---
title: "OpenLayers Editor"
summary: "Wie schon die Kartenbibliothek OpenLayers, wurde auch der OpenLayers Editor vor einiger Zeit von Grund auf neu geschrieben und auf Github publiziert. Das Ziel ist nach wie vor die Bereitstellung eines Werkeugkastens für die Bearbeitung räumlicher Daten. Der Fokus liegt auf der einfachen Integration der Tools in bestehende Kartenanwendungen sowie auf Nutzerfreundlichkeit bei der Bedienung."
slug: openlayers-editor
---
Motivation
----------

Bei geOps entwickeln wir in erster Linie Software für den Umweltbereich und Anwendungen für den öffentlichen Verkehr. Ein Beispiel ist [Altlast4Web](https://geops.de/altlast4web), eine Software mit der die meisten Schweizer Kantone ihr Kataster für belastete Standorte verwalten. Die Anwendung umfasst diverse Funktionalitäten eines WebGIS - eine davon ist die Bereitstellung von Werkzeugen für die komfortable geometrische Bearbeitung von Geodaten.

![](/images/blog/openlayers-editor/openlayers-editor-altlast.png "OpenLayers Editor in Altlast4Web")

Außerdem entwickeln wir auf Basis unseres [GeoCMS Cartaro](https://geops.de/produkte/geospatial-cms) die Software zur Erfassung der [Bahnhofpläne](https://geops.de/l%C3%B6sungen/bahnhofpl%C3%A4ne) für die 33 größten Schweizer Bahnhöfe. Mit der Software werden Flächen digitalisiert sowie Piktogramme platziert und aneinander ausgerichtet.

![](/images/blog/openlayers-editor/openlayers-editor-bahnhof.jpg "Bahnhofpläne")

Um die diversen Werkzeuge für die Geometriebearbeitung wiederverwenden zu können, haben wir eine Neuentwicklung des bewährten [OpenLayers Editor](http://openlayers-editor.geops.de/) (kurz OLE) vorgenommen. Die Open Source Bibliothek stellt einfach zu verwendende Werkzeuge für die Erfassung und Bearbeitung von Geodaten bereit.

Prinzipien
----------

Die folgenden Prinzipien sind für die Entwicklung von OLE maßgeblich.

#### Abstraktion

![](/images/blog/openlayers-editor/openlayers-editor-abstraktion.png "OpenLayers Editor Abstraktion")

OpenLayers Editor stellt eine Abstraktions- und Erweiterungsschicht zwischen OpenLayers und der eigentlichen Anwendung dar. Während OpenLayers alle grundlegenden APIs für die Entwicklung von Kartenanwendungen bereitstellt, sind komplexere Kartenfunktionalitäten schnell mit Entwicklungsaufwand verbunden. OpenLayers Editor hat das Ziel, eine umfangreiche Toolbox für die Bearbeitung von räumlichen Daten in Webanwendungen zur Verfügung zu stellen.

#### Kollaboration

Die Anwendung ist Open Source und auf [GitHub](https://github.com/geops/openlayers-editor) sowie [NPM](https://www.npmjs.com/package/ole) verfügbar. Dadurch wollen wir zum einen die Nutzung durch andere ermöglichen, erhoffen uns aber auch Beiträge zur Erweiterung der Software.

#### Wiederverwendbarkeit

Die einzelnen Funktionen können in unterschiedlichsten Anwendungen flexibel kombiniert werden. Dabei haben wir das Ziel, eine stabile und ausführlich getestete [API](http://openlayers-editor.geops.de/api.html) zur Verfügung zu stellen. Zusätzlich können wir dadurch mehr Zeit in eine benutzerfreundliche Lösung investieren.

Funktionen
----------

OpenLayers Editor bietet aktuell Tools zum Zeichnen, Rotieren, Verschieben und Löschen von Geometrien. Das CAD Tool ermöglicht zudem die Ausrichtung von Geometrien an Hilfslinien. Unter Verwendung der [JavaScript Topology Suite](https://github.com/bjornharrtell/jsts) bieten wir zudem einige Werkzeuge für topologische Operationen an.

![](/images/blog/openlayers-editor/openlayers-editor-demo.png "OpenLayers Editor Demo")

Technologien
------------

Technologisch ist OpenLayers Editor auf dem neuesten Stand. Wir verwenden aktuelle JavaScript-Standards (ES6+), Linting (ESLint) und automatische Tests (Cypress, Travis CI). Technische Basis und gleichzeitig die einzigen Abhängigkeiten sind die Kartenbibliothek OpenLayers und bei Bedarf die JavaScript Topology Suite.

Die Demo auf unserer [Website](http://openlayers-editor.geops.de/) zeigt alle verfügbaren Funktionen und der [Code dazu auf GitHub](https://github.com/geops/openlayers-editor/blob/master/index.html) kann als Beispiel für eigene Projekte dienen. Wir freuen uns über Feedback sowie Pull Requests und sind gespannt auf neue Einsatzbereiche für OLE.