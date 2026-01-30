---
title: Kommt mein Zug denn auch wirklich pünktlich?
summary: Live Maps werden als eine wertvolle Informationsquelle für Reisende
  eingesetzt. Sie können aber auch als Übersicht für den aktuellen Zustand des
  öV-Betriebs genutzt werden.
slug: puenktlichkeitskarte
gridImage: /images/cases/kommt-mein-zug-denn-auch-wirklich-pünktlich/adobestock_310709156_editorial_use_only_2.jpeg
weight: 7
cover: /images/cases/puenktlichkeitskarte/screenshot-2025-09-04-140246.png
customer: ""
service: Development and operation
timeline: Ongoing since 2022
published: true
content:
  sections:
    - imagePosition: bottom
      highlight: false
      title: Strong visualization in extreme situations
      text: >-
        A good example of this application is the [punctuality map for
        Switzerland](https://maps2.trafimage.ch/ch.sbb.netzkarte?baselayers=ch.sbb.netzkarte,ch.sbb.netzkarte.dark,ch.sbb.netzkarte.luftbild.group,ch.sbb.netzkarte.landeskarte,ch.sbb.netzkarte.landeskarte.grau&lang=de&layers=ch.sbb.puenktlichkeit-all&x=953651.78&y=5998579.74&z=11.049958158687245).
        It shows exactly which vehicles are running on schedule, which are on
        time, and which are canceled. This provides a comprehensive overview of
        both regular operations and disruptions. Even in the event of extreme
        circumstances, such as the snowfall on January 15, 2021, the full extent
        of the disruption is visible. We know of several CEOs at transport
        companies who check this map first thing every morning.


        ![]()
      image: /images/cases/kommt-mein-zug-denn-auch-wirklich-pünktlich/20210125_vbz_flockdown.jpg
    - imagePosition: bottom
      highlight: false
      title: "Die technische Basis: TRALIS als Datendrehscheibe und
        opentransportdata.swiss"
      text: The basis of the punctuality map is the same as for our [global train
        tracker](https://mobility.portal.geops.io/de/world.geops.transit?world.geops.traviclive)TRALIS
        is optimized to integrate and analyze even large amounts of data and
        output it back to the customer systems with minimal latency. TRALIS
        communicates either via interfaces according to standards and
        quasi-standards such as VDV, NetEX, and GTFS, but also offers specific
        REST and WebSocket interfaces that are tuned for maximum performance.
        TRALIS supports many applications. The system is used not only for live
        maps but also for non-map-based, internal applications such as
        connection assurance for NVBW. The target and actual data that TRALIS
        processes for the punctuality map is obtained as GTFS and GTFS-RT from
        opentransportdata.swiss.
      image: /images/cases/puenktlichkeitskarte/punkt.png
  title: "The punctuality map: Punctuality, delays, and cancellations at a glance"
  lead: Live maps are used as a valuable source of information for travelers.
    However, they can also be used to provide an overview of the current status
    of public transport operations.
---
