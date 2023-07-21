---
title: "Direct Connections Europe - Line Network Map for Day and Night Connections "
summary: A city trip to Venice or an important business meeting in Berlin? That
  can be reached comfortably and in an environmentally friendly way by train.
  There are direct day and night connections to European cities from various
  Swiss stations. Our "Direct connections to Europe" map for SBB illustrates
  this in a visually appealing way with a route network map.
author: Maja Schudel
cover: /images/blog/direct-connections-europe-line-network-map-for-day-and-night-connections/blog_ipv_4.png
created: 2023-07-20
slug: direct-connections-europe
tags:
  - maps
  - passengerinformation
  - cartaro
frontpage: true
published: true
---
A city trip to Venice or an important business meeting in Berlin? That can be reached comfortably and in an environmentally friendly way by train. There are direct day and night connections to European cities from various Swiss stations. Our "Direct connections to Europe" map for SBB illustrates this in a visually appealing way with a route network map.



## The background

Direct day and night connections from Switzerland to Europe are becoming increasingly popular with rail passengers. Our customer SBB knows this too. For this reason, we have been given the exciting task of depicting the direct rail connections to various European cities in a separate map.

On some routes there are both day and night connections. In order to show these in parallel on an ongoing basis, we have created a route network map. In this way, those interested can see at a glance whether there are day and/or night connections on a route.

![direct-connections-1](/images/blog/direktverbindungen-europa-–-liniennetzplan-für-tag-und-nachtverbindungen/blog_ipv_1.png "geOps-direct-connections-1")

<img src="/images/blog/direktverbindungen-europa-–-liniennetzplan-für-tag-und-nachtverbindungen/blog_ipv_1.png" alt="tag-und-nachtverbindungen" style="border: 2px solid  gray;">

In addition to a good overview of which destinations in Europe are served directly, all connections running there are displayed as a list when a line or station is selected. With the fold-out string of pearls, you can also see exactly where the train stops en route. In this way, the map can also be used as a source of inspiration to see where you can travel to from the nearest larger station.

![direct-connections-2](/images/blog/direktverbindungen-europa-–-liniennetzplan-für-tag-und-nachtverbindungen/blog_ipv_2.png "geOps-direct-connections-2")

To give the increasingly important night connections the relevance they deserve, there is a separate map for them with our Darkstyle base map in the background.

![direct-connections-3](/images/blog/direktverbindungen-europa-–-liniennetzplan-für-tag-und-nachtverbindungen/blog_ipv_3.png "geOps-direct-connections-3")



## The solution

In our geoCMS Cartaro we enable data entry and maintenance. Customers can enter the connections themselves that are to be shown on the map. For this purpose, Europe-wide train networks are available on which any connections can be freely entered.

In addition to choosing whether it is a day or night connection, the stations can be entered and a short description and link can be added. In the spirit of an international map, this works in four languages (German, French, Italian and English).

We have developed a special algorithm that can be used to generate a route network map based on the newly entered or changed data. In order to be able to check the plan while it is still in editing mode, there is a preview. After this has been called up and checked by the customers, vector tiles can be built with the current data at the push of a button.



## Outlook

International passenger traffic will continue to grow in importance. We already have some ideas for the further development of the Direct Connections web map to offer rail travellers even more support in planning their journeys. So one can be curious. It is worth taking a regular look at the "Direct Connections to Europe" map.

The map is integrated on the SBB website under *[Direct Connections to Europe](https://www.sbb.ch/de/freizeit-ferien/destinationen/staedte-laender-europa.html)* and under *[Night Connections to Europe](https://www.sbb.ch/de/freizeit-ferien/zuege-ausfluege/nachtzug.html)*. In addition, like most of our maps, it can also be found on the *[Trafimage web map portal](https://maps.trafimage.ch/ch.sbb.direktverbindungen?baselayers=ch.sbb.direktverbindungen.base-light,ch.sbb.direktverbindungen.base-dark,ch.sbb.direktverbindungen.base-aerial&lang=de&layers=ch.sbb.direktverbindungen.night,ch.sbb.direktverbindungen.day&x=925472&y=5920000&z=9)*.