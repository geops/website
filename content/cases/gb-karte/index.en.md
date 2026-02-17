---
title: Where is which public transport pass valid? Our solution visualises this
  reliably. Throughout Switzerland and automatically.
summary: Together with Alliance SwissPass, we have developed a fully automated
  card solution that visualises the validity areas of public transport season
  tickets across all lines and transport companies throughout Switzerland in a
  precise, up-to-date and user-friendly manner.
slug: map-of-validity
gridImage: /images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/gb-karte_grid.png
gridWidthFull: true
weight: 1
cover: /images/cases/gb-karte/screenshot-2025-09-03-141917.png
customer: Allianz Swiss Pass
service: Automated map solution, data integration, UX/UI design, responsive
  front end, print on demand
timeline: ongoing since 2022
published: true
content:
  sections:
    - imagePosition: null
      highlight: false
      title: From static PDFs to dynamic maps
      text: >-
        As frequent commuters on public transport, the General Abonnement (GA)
        makes everyday travel easier for many people. But is it really valid
        everywhere?


        For more than 20 years, SBB has been producing so-called validity area maps in printed form or as PDF files. The desire to display more details on the maps was one of the drivers behind our digital validity area map project. In addition, PDF maps no longer met the requirements for digital information transfer. The most important reason for replacing the previous cards and the associated manual maintenance of content was the fact that the information on areas of validity was already available in other databases, where it was used as the basis for fare calculation and ticket sales, and where a great deal of energy had therefore already been invested in keeping it up to date.
      image: ""
    - imagePosition: null
      highlight: false
      title: NOVA-Daten als Fundament für eine neue Kartenlösung
      text: The areas of validity for the various travelcards are taken from the
        **NOVA** fare database, which is operated by SBB on behalf of the
        Federal Office of Transport. This central database provides all relevant
        fare information – from national rail routes to special regional
        connections. geOps uses this data to project it precisely onto the
        entire Swiss public transport network using its own routing tool. The
        resulting web map symbolises areas of validity in colour and makes them
        interactively queryable. Intelligent generalisation logic ensures that
        the display remains clear at national level and is also accurate down to
        the last detail at local level.
    - imagePosition: null
      highlight: false
      title: Data intelligence meets cartography
      text: >-
        To make the complex subscription validity information from NOVA
        understandable and usable for everyone, geOps combines data expertise
        with precise cartography. At the heart of this is our topologically
        correct public transport network with detailed route lines and stops in
        various levels of generalisation. Using our specially developed routing
        engine, we generate precise line routes from the fare edges stored in
        NOVA, defined by start and end stops. Heuristics are also used to
        correctly display special cases such as different station numbers,
        airport buses or cross-border connections. This means that even minor
        differences, such as in the Jungfrau region or on tourist mountain
        railways, can be reliably mapped. For particularly complex cases, such
        as seasonal sports buses or directional restrictions on Lake Constance,
        the map deliberately uses neutral representations with corresponding
        notes. The result is an intelligent fusion of data modelling and map
        design that clearly visualises even complicated fare scenarios. Data
        integration and publication as vector tiles is fully automated with
        pipelines, allowing it to be updated several times a year. 


        ![](/images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/gb1.webp "The Jungfrau Railways coverage map clearly shows where the GA travelcard is valid, partially valid or not valid at all.")
      image: ""
    - imagePosition: bottom
      highlight: true
      title: "Looking ahead: more features, more subscriptions, more clarity"
      text: The solution is already up and running and can be expanded with more
        subscription types, regions, or features. It creates a clear foundation
        for info and sales systems, as well as for end customers. At the same
        time, the project shows how complex data structures can be made
        understandable with smart tech and careful modelling. This approach can
        also be used in other markets and systems. At SBB, the map is integrated
        into several areas of the
        [website](https://www.sbb.ch/en/tickets-offers/travelcards/ga-travelcard/ga-travelcard-area-validity.html).
        The map is also available independently on the [Trafimage web map
        portal](https://maps.trafimage.ch/ch.sbb.geltungsbereiche?baselayers=ch.sbb.geltungsbereiche.mvp.data&layers=ch.sbb.geltungsbereiche.mvp-ga_s25&lang=en&x=925472&y=5920000&z=9).
        In this version, the function for searching for stops and other
        locations is particularly practical. Other transport companies that want
        to use the map on their website can use the programming interface
        [documented here](https://jsdoc.maps.trafimage.ch/).
      image: /images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/adobestock_867166537.jpeg
  title: See clearly throughout Switzerland with the automated area of validity map
  lead: >-
    Together with Alliance SwissPass, we have developed a fully automated card
    solution that visualises the validity areas of public transport season
    tickets across all lines and transport companies throughout Switzerland in a
    precise, up-to-date and user-friendly manner.


    ![](/images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/gb_uebersicht-kopie.png)
testimonialsOnTop: true
testimonials:
  - name: Karin Fankhauser
    position: National Pricing, SBB (2025)
    text: I appreciate the customer-oriented cooperation. Our concerns are always
      taken seriously, promptly reviewed and clarified, and responded to with a
      clear and solution-oriented proposal. Implementation is straightforward
      and always in the best interests of the customer.
    portrait: ""
tags:
  - maps
---
