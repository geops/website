---
title: mobility-toolbox-js v3
summary: >
  mobility-toolbox-js dient als primäres Gateway für die Entwicklung von
  Geodaten-Webanwendungen unter Verwendung unserer firmeneigenen APIs.


  Dieses Projekt gibt es schon seit Jahren, aber Version 3 bringt massive Verbesserungen in Bezug auf die Entwicklungserfahrung, die Benutzerfreundlichkeit und die Integration in bestehende Anwendungen.
slug: mobility-toolbox-js-v3
---
Alle Entwicklungen bei geOps basieren auf Open-Source-Software. Neben der Verwendung bestehender Kartierungsbibliotheken [OpenLayers](https://openlayers.org/) und [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) erstellen wir auch eigene Softwarepakete wie **[mobility-toolbox-js](https://mobility-toolbox-js.geops.io/)**.

**[mobility-toolbox-js](https://mobility-toolbox-js.geops.io/)** dient als primäres Gateway für die Entwicklung von Geodaten-Webanwendungen unter Verwendung unserer **[geOps in-house APIs](https://developer.geops.io/).**.

Dieses Projekt gibt es schon seit Jahren, aber Version 3 bringt massive Verbesserungen in Bezug auf die Entwicklungserfahrung, die Benutzerfreundlichkeit und die Integration in bestehende Anwendungen

Die Code-Überarbeitung für Version 3 erfolgte unter dem Motto **Das Rad nicht neu erfinden**:

* Entfernung der gesamten anwendungsspezifischen Code, der die Codebasis verschmutzt und die Bibliothek unwartbar macht.
* Entfernung von ausgefallenem Code, der architektonisch gut ist, aber niemand versteht
* Entfernung von unverständlicher oder umständlicher Dokumentation.
* Entfernung von benutzerdefinierten APIs, die mit [OpenLayers](https://openlayers.org/), [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) oder anderen Open-Source-Projekten wie [geoblocks/ol-maplibre-layer](https://github.com/geoblocks/ol-maplibre-layer) realisiert werden können.

**mobility-toolbox-js** Version 3 wurde so umgestaltet, dass es anderen Mapping-Bibliotheken so nahe wie möglich kommt. Dadurch fühlt sich die Entwicklung mit mobility-toolbox-js für Entwickler, die sehr beliebte Open-Source-Bibliotheken wie [OpenLayers](https://openlayers.org/) oder [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) verwenden, sehr vertraut an.

Das Ergebnis ist ein Produkt, **das einfach funktioniert**, **in jedem Kontext verwendet werden kann** und für das **keine zusätzlichen API-Kenntnisse erforderlich sind**

Das folgende Beispiel zeigt, wie einfach es ist, Echtzeitdaten mit unserer [geOps Realtime API](https://geops.com/de/solution/livemap) in eine bestehende OpenLayers-Anwendung einzufügen:

![Example of code how to add geOps Realtime  API data](/images/blog/mobility-toolbox-js-3-0-0/geops-realtime-api-code-example.jpeg "Example of code how to add geOps Realtime  API data")

Dieses Beispiel und mehrere andere finden Sie auf [der offiziellen Website](https://mobility-toolbox-js.geops.io/examples). Sehen Sie sich auch [die Dokumentation](https://mobility-toolbox-js.geops.io/doc) an, die für diese neue Version ebenfalls grundlegend überarbeitet wurde.

Wir verwenden **mobility-toolbox-js** in allen unseren Anwendungen. Ein gutes Beispiel ist unsere [mobility-web-component](https://mobility-web-component.geops.io/geops-mobility) eine Webkomponente, die alle [geOps APIs](https://developer.geops.io/) in einem HTML-Element zusammenfasst, das durch Attribute konfigurierbar ist. Sie können sie live auf der [RVF- Website](https://www.rvf.de/fahrtinfo/netzplan) in Aktion sehen:

Auch unsere bekannte [Live-Karte für die S-Bahn München](https://www.s-bahn-muenchen.de/de/fahren/live-map) nutzt **mobility-toolbox-js**:


![geOps application: S-Bahn München Live Map](/images/blog/mobility-toolbox-js-3-0-0/tralis-live-map.png "geOps application: S-Bahn München Live Map")

Wir hoffen, dass unsere Bemühungen das Leben von Entwicklern räumlicher Webanwendungen erleichtern und die Gesamtqualität räumlicher Webanwendungen verbessern.