---
title: Smart live information for S-Bahn passengers in Munich.
summary: With the live map for Munich's S-Bahn, we show how modern GPS data can
  be combined with real-time, accurate departure information and an intuitive
  map view. The solution provides updates in a fraction of a second and makes
  information available on the go, either in the Navigator app, directly on the
  map, or via a route network plan.
slug: s-bahn-muenchen
gridImage: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/screenshot-2025-09-04-083027_neu.jpg
gridWidthFull: true
weight: 7
cover: /images/cases/s-bahn-muenchen/screenshot-2025-09-04-083027.png
customer: DB Regio AG
service: Livemap, interface for timetables and real-time data, disruption
  information, data hub
timeline: ongoing since 2017
published: true
content:
  sections:
    - imagePosition: bottom
      highlight: false
      title: Heaviest traffic on two tracks
      text: "Nowhere else in Europe is there more traffic on two tracks: with around
        1,000 trains per day, the Munich S-Bahn trunk line has the highest
        traffic volume. At the same time, it is operating at full capacity. With
        the second trunk line currently under construction, Munich will finally
        get the long-awaited bypass for the existing west-east crossing. At the
        same time, operators are continuously optimizing the information
        provided to customers. To provide better information about the current
        operating situation, DB Regio has commissioned geOps to set up a
        real-time information system. GPS data from the S-Bahn trains will be
        used to display train positions on a map and to generate departure
        forecasts."
      image: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/12.png
    - imagePosition: bottom
      highlight: false
      title: This is how we make real time visible at geOps
      text: >-
        During peak times, around 100 suburban trains operate simultaneously on
        the Munich network. Each of them sends a GPS signal approximately every
        ten seconds, which contains information about the train's current
        formation and status in addition to its position. The system developed
        by geOps reads the trains' GPS data on the one hand and the timetable
        and real-time data on cancellations and delays on the other. All sources
        are combined to validate the timetable data and make more accurate
        forecasts. As is appropriate for the S-Bahn's tight schedule of less
        than 1 minute in some cases, the forecasts aim to show passengers the
        next available connections precisely and clearly. 


        The Live Maps system is operated via a separate website that is integrated into both the [Munich S-Bahn website](https://s-bahn-muenchen-live.de/?mode=schematic&x=2406279&y=1722649&z=5.5) and the official information app, the Munich Navigator.
      image: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/11.png
    - imagePosition: bottom
      highlight: false
      title: Precision every second
      text: Up to 900 signals from trains are processed per minute and analyzed using
        sophisticated heuristics. Just two seconds after each signal is sent
        from the train, the data is processed in the geOps system and forwarded
        to the client devices. On the client side, passengers can view the
        information on a map or route network plan, as well as in the string of
        pearls and on a departure display. Stations can be selected on the map,
        whereupon all departures are displayed.
    - imagePosition: bottom
      highlight: false
      title: "The technical basis: TRALIS as a data hub, MOCO for fault reports"
      text: Die Basis der Pünktlichkeitskarte ist die gleiche wie auch für unseren
        weltweiten Zugtracker. Für die Verarbeitung und Analyse von Soll- und
        Echtzeitdaten kommt TRALIS, unsere Datendrehscheibe, zum Einsatz. TRALIS
        ist optimiert dafür, auch grosse Datenmengen zu integrieren, zu
        analysieren und mit minimalen Latenzen wieder an die Abnehmersysteme
        auszugeben. Für die Live Map der S-Bahn München wurden die
        Standardfunktionen zur Verarbeitung von Soll- und Echtzeitdaten
        erweitert, um zusätzlich GPS-Daten zu analysieren. Die tatsächliche
        Position des Zuges, die der GPS-Sender liefert, wird zur Überprüfung und
        Anpassung der Echtzeitprognosen aus den Leitstellen der Bahn verwendet.
        Für die Darstellung von Meldungen zu Bauarbeiten, Haltausfällen,
        Unterbrüchen oder Ersatzverkehren kommt MOCO zum Einsatz, das
        Redaktionstool für Störungsmeldungen. MOCO nutzt über eine Schnittstelle
        die Meldungen aus den Leitsystemen der Bahn. Vollautomatisch werden mit
        MOCO die Meldungen auf Linien oder Haltestellen zur Darstellung im
        Netzplan abgebildet. Nach Bedarf können einzelne Meldungen in MOCO mit
        weiteren Informationen einschliesslich Links, Fotos und Grafiken ergänzt
        werden.
    - imagePosition: bottom
      highlight: true
      title: "Looking ahead: Live maps for more information and safety"
      text: The live map has become very popular with Munich S-Bahn customers.
        Especially when there are service disruptions, up to 300,000 people
        access the service at the same time. Numerous comments describe the live
        map as the most reliable source of information for the Munich S-Bahn.
        Due to the positive response, the system has been extended to other
        S-Bahn systems in Germany and to replacement transport services. With
        the ongoing integration of further information, Live Maps is developing
        into a comprehensive source of information for travelers. In addition to
        the actual real-time data, particularly important additions include
        disruption information, which is displayed both in text form and as
        route markings on the map, and details of alternative routes.
      image: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/adobestock_581571846_editorial_use_only.jpeg
  title: Munich S-Bahn in real time with our real-time information system
  lead: With the [Livemap for Munich's
    S-Bahn](https://s-bahn-muenchen-live.de/?mode=schematic&x=2285725&y=1746650&z=5.82),
    we show how modern GPS data can be combined with real-time, accurate
    departure information and an intuitive map view. The solution provides
    updates in a fraction of a second and makes information available on the go,
    either in the Navigator app, directly on the map, or via a route network
    plan.
testimonialsOnTop: false
testimonials:
  - name: Carola Bertsch
    position: Passenger information QS and projects, DB Regio AG (2025)
    text: Our collaboration with geOps has been outstanding for five years now.
      Further developments are discussed, approached, and implemented in a
      professional, creative, and implementation-oriented manner. When it comes
      to quality assurance issues, the collaboration is always extremely
      reliable and focused. At this level, achieving goals together is
      enjoyable.
    portrait: /images/cases/s-bahn-muenchen/divers-leinwände-querformat-.png
tags:
  - maps
---
