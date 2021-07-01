---
title: Livemap S-Bahn München
summary: "Nirgendwo in Europa gibt es mehr Verkehr auf zwei Gleisen: Mit rund
  1000 Zügen am Tag verzeichnet die S-Bahn-Stammstrecke München das höchste
  Verkehrsaufkommen und fährt damit an ihrer Kapazitätsgrenze."
author: Uli Müller
cover: /images/blog/livemap-s-bahn-münchen/tralis_blogentry.jpg
created: 2021-02-12
slug: tralis-livemap
tags:
  - javascript
  - realtime
  - mobility
  - passengerinformation
published: true
---
### Dichtester Verkehr auf zwei Gleisen

Nirgendwo in Europa gibt es mehr Verkehr auf zwei Gleisen: Mit rund 1000 Zügen am Tag verzeichnet die S-Bahn-Stammstrecke München das höchste Verkehrsaufkommen und fährt damit an ihrer Kapazitätsgrenze. Mit der im Bau befindlichen 2. Stammstrecke wird München den lang ersehnten Bypass für die bestehende West- Ost-Querung bekommen. Parallel dazu arbeiten die Betreiber intensiv an der Verbesserung der Kunden­infor­mation.

### Mit GPS den Fahrplan aufwerten

Zur besseren Information über die aktuelle Betriebssituation hat die Deutsche Bahn geOps mit dem Aufbau eines Echtzeitinformationssystems beauftragt. Dabei werden GPS-Daten aus den S-Bahnen für die Anzeige der Zugpositionen auf einer Karte und für die Erstellung von Abfahrtsprognosen genutzt.

![](https://next-geops-website.netlify.app/images/solution/tralis-livemap/tralis_plan.jpg)

In Spitzenzeiten verkehren rund 100 S-Bahnen gleichzeitig im Münchner Netz. Jede davon sendet etwa alle zehn Sekunden ein GPS-Signal, das neben der Position auch Informationen zum aktuellen Zuglauf und zum Status des Zuges enthält. Das von geOps entwickelte System liest einerseits die GPS-Daten der Züge und andererseits aktuelle Informationen zu Ausfällen und Verspätungen aus dem Fahrplan. Beide Quellen werden miteinander verschnitten, um die Fahrplandaten zu validieren und genauere Prognosen zu erstellen. Wie es beim engen Takt der S-Bahn von teils unter 1 Minute angebracht ist, zielen die Vorhersagen darauf ab, dem Fahrgast die nächsten Fahrmöglichkeiten präzise und optisch übersichtlich anzuzeigen.

### Reisendeninformation in der Navigator-App

Pro Minute werden bis zu 900 Signale aus den Zügen verarbeitet und mittels ausgefeilter Heuristiken analysiert. Nur zwei Sekunden nach dem Senden jedes Signals aus dem Zug sind die Daten im System von geOps verarbeitet und werden an die Client-Geräte weitergeleitet. Auf Client-Seite sieht der Reisende die Informationen auf einer Karte oder einem Liniennetzplan und einem Abfahrtsanzeiger. Auf der Karte lassen sich die Stationen auswählen, worauf die Abfahrten an der gewählten Station gezeigt werden.

![](https://next-geops-website.netlify.app/images/solution/tralis-livemap/iphon-app-mockup.png)

Der Client ist in der offiziellen Auskunfts-App der S-Bahn („München Navigator“) eingebunden und unter [s-bahn-muenchen-live](https://s-bahn-muenchen-live.de/) verfügbar.

### Projektmanagement und Qualitätssicherung

Das Projekt wurde in agiler Vorgehensweise entwickelt. Wöchentliche Telkos, regelmässige Workshops und Kollaborations-Tools halfen dabei, die grossen technischen Herausforderungen zu meistern und in nur wenigen Monaten ein für die Reisenden optimiertes System zu entwickeln. Um den hohen Anforderungen an die Performanz und Verfügbarkeit gerecht zu werden, wurde besonderer Wert auf die Qualitätssicherung gelegt. Die Qualität des Programmcodes wurde durch Code- Reviews, automatisierte und manuelle Tests, regelmässiges Refactoring und laufendes Aktualisieren der verwendeten Bibliotheken sichergestellt. Durch das automatisch skalierende Backend in der Amazon Cloud ist die Stabilität auch bei großen Nutzerzahlen immer gewährleistet.

### Technologien

* JavaScript mit React, OpenLayers, Web Socket

  App-Einbindung mit WebViews

  Backend mit Python (u.a. mit asyncio, aioredis, websocket), PostGIS und Redis Cache

  NetEx/SIRI-kompatible Schittstellen und Datastores

  Infrastruktur auf AWS mit Auto-Scaling