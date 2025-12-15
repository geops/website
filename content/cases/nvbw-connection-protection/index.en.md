---
title: Connection fuse for the NVBW
summary: A powerful, attractive and reliable public transport system is at the
  heart of a successful transport revolution. In addition to the punctuality of
  trains and buses, ensuring that connections run as scheduled is a very
  important factor in shaping passengers' confidence in public transport.
slug: nvbw-connection-protection
gridImage: /images/cases/nvbw-connection-protection/nvbw_übersicht.png
gridWidthFull: false
weight: 2
cover: /images/cases/nvbw-connection-protection/header.png
customer: NVBW
service: Automated timetable evaluation
timeline: "2025"
published: true
content:
  sections:
    - text: Unfortunately, the control centres of railway companies in Germany are
        currently very busy and therefore focus primarily on operational
        processes in the event of disruptions. This means that there is usually
        not enough time to provide comprehensive passenger information and
        secure travel chains. The situation has worsened in recent years as DB
        Netz AG, the operator of the rail network, has abandoned its previous
        role of coordinating connections between trains – a practice that had
        been standard for over a century. This has made coordination between the
        control centres of the individual companies considerably more complex
        and has not yet been implemented across the board. As a result,
        connections are often no longer guaranteed today, and the needs of
        passengers are increasingly being overlooked.
      title: Scarce resources – an obstacle to reliable travel information
      image: ""
    - title: Digital assistants to support staff
      text: >-
        The NVBW, as a service company of the Baden-Württemberg Ministry of
        Transport, has therefore commissioned us to develop an integrated system
        for connection assurance that can be used across companies.


        The system consists of a web application that is made available to the control centres of all companies. It also includes an app for vehicles that shows drivers whether and how long they have to wait to ensure connections from delayed feeder services. Both applications are developed as open source software. They are made available to all companies free of charge via the NVBW.


        In the background, the system processes scheduled data and real-time data. The scheduled connections are derived from the scheduled data, taking into account the transfer times between two journeys. The real-time data is then used to generate information on how long to wait for feeder services. The web application provides the control centre with very detailed information about which connections are guaranteed and which have to be broken due to excessive time differences. The app for drivers shows the waiting times without further details in order to avoid any unnecessary distractions.
      image: /images/cases/nvbw-connection-protection/mockup.jpg
      imagePosition: null
    - title: "The technical basis: TRALIS as a data hub"
      text: Our TRALIS data hub is used to process and analyse target and real-time
        data. TRALIS is optimised to integrate even large amounts of data,
        analyse it with minimal latency and output it back to the customer
        systems. The app and web app are supplied with data from TRALIS via
        specialised WebSocket and REST interfaces (standard interfaces such as
        VDV 453 were not used for communication within the system for
        performance reasons). The backend is operated on classic rental servers,
        with automated deployment allowing for short-term horizontal scaling if
        required.
    - title: "Looking ahead: from the pilot phase to productive use"
      text: Both tools are currently in the pilot phase. Various minor optimisations
        are already planned, such as more differentiated consideration of
        transfer times. Above all, however, interfaces to the companies' ITCS
        are to be established so that connection security is directly available
        in dispatching. Use is still limited to railway companies, but an
        expansion to other modes of transport is already planned. It remains to
        be seen whether the current deterministic approach to recommending
        waiting times will suffice in the long term. It may be necessary to
        supplement simulations of various scenarios in order to enable as many
        travellers as possible to reach their destinations quickly and safely.
      highlight: true
  lead: >-
    ![](/images/cases/nvbw-connection-protection/bild-1_nvbw.png)


    A powerful, attractive and reliable public transport system is at the heart of a successful transport revolution. In addition to the punctuality of trains and buses, ensuring that connections run as scheduled is a very important factor in shaping passengers' confidence in public transport.
  title: Connection guarantees as an important component for quality in public
    transport
testimonials:
  - portrait: /images/cases/nvbw-connection-protection/marius.png
    text: With these two applications, we can provide staff in both control centres
      and on trains with the necessary information about connections in a
      targeted manner. The applications have a very successful, clear design
      that is well received by users and shows that the user's perspective
      played a central role in their development. In addition, we already have
      further developments in the pipeline, such as precise transfer times and
      the inclusion of additional modes of transport.
    name: Marius Welle
    position: Marius Welle – Quality Management, NVBW
tags:
  - mobility
---
