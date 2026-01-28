---
title: Kommt mein Zug denn auch wirklich pünktlich?
summary: Live Maps werden als eine wertvolle Informationsquelle für Reisende
  eingesetzt. Sie können aber auch als Übersicht für den aktuellen Zustand des
  öV-Betriebs genutzt werden.
slug: puenktlichkeitskarte
gridImage: /images/cases/kommt-mein-zug-denn-auch-wirklich-pünktlich/adobestock_310709156_editorial_use_only_2.jpeg
weight: 7
cover: /images/cases/puenktlichkeitskarte/screenshot-2025-09-04-140246.png
customer: SBB CFF FFS
service: Entwicklung und Betrieb
timeline: laufend seit 2022
published: true
content:
  sections:
    - imagePosition: bottom
      highlight: false
      title: Starke Visualisierung in Extremsituationen
      text: >-
        Ein schönes Beispiel für diesen Anwendungsfall ist
        die [Pünktlichkeitskarte für die
        Schweiz](https://maps2.trafimage.ch/ch.sbb.netzkarte?baselayers=ch.sbb.netzkarte,ch.sbb.netzkarte.dark,ch.sbb.netzkarte.luftbild.group,ch.sbb.netzkarte.landeskarte,ch.sbb.netzkarte.landeskarte.grau&lang=de&layers=ch.sbb.puenktlichkeit-all&x=953651.78&y=5998579.74&z=11.049958158687245).
        Sie zeigt genau, welche Fahrzeuge planmässig verkehren, welche pünktlich
        sind und welche ausfallen. So entsteht ein umfassender Überblick sowohl
        im Regelbetrieb wie auch bei Störungen. Sogar bei extremen Ereignissen
        wie beispielsweise dem Schneefall am 15. Januar 2021 wird das gesamte
        Ausmass der Beeinträchtigung sichtbar. Wir wissen von einigen CEOs bei
        Transportunternehmen, die jeden Morgen als Erstes auf diese Karte
        schauen.


        ![]()
      image: /images/cases/kommt-mein-zug-denn-auch-wirklich-pünktlich/20210125_vbz_flockdown.jpg
    - imagePosition: bottom
      highlight: false
      title: "Die technische Basis: TRALIS als Datendrehscheibe und
        opentransportdata.swiss"
      text: Die Basis der Pünktlichkeitskarte ist die gleiche wie auch für
        unseren [weltweiten
        Zugtracker](https://mobility.portal.geops.io/de/world.geops.transit?world.geops.traviclive).
        Für die Verarbeitung und Analyse von Soll- und Echtzeitdaten kommt
        unsere Datendrehscheibe TRALIS zum Einsatz. TRALIS ist optimiert dafür,
        auch grosse Datenmengen zu integrieren, zu analysieren und mit minimalen
        Latenzen wieder an die Abnehmersysteme auszugeben. TRALIS kommuniziert
        entweder über Schnittstellen nach Standards und Quasi-Standards wie VDV,
        NetEX und GTFS, bietet daneben aber auch spezifische REST- und
        Websocket-Schnittstellen, die auf höchste Performance getrimmt sind. Mit
        TRALIS werden viele Anwendungen unterstützt. Das System ist nicht nur
        für Live Maps sondern auch für nicht kartenbasierte, betriebsinterne
        Anwendungen wie etwa die Anschlusssicherung der NVBW im Einsatz. Die
        Soll- und Ist-Daten, die TRALIS für die Pünktlichkeitskarte verarbeitet,
        werden als GTFS und GTFS-RT von opentransportdata.swiss bezogen.
      image: /images/cases/puenktlichkeitskarte/punkt.png
  title: "Die Pünktlichkeitskarte: Pünktlichkeit, Verspätungen und Ausfälle auf
    einen Blick"
  lead: "*Live Maps werden als eine wertvolle Informationsquelle für Reisende
    eingesetzt. Sie können aber auch als Übersicht für den aktuellen Zustand des
    ÖV-Betriebs genutzt werden.*"
---
