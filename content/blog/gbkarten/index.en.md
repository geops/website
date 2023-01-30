---
title: Digital maps of travelcard validty
summary: "The map of the areas of validity of Generalabo, Half-Fare Card and
  other Swiss public transport season tickets is now available as a true digital
  version. The map, which was previously maintained manually and produced as a
  PDF or printed folding map, has been replaced by an automatically generated,
  dynamic web map. "
author: Uli Müller
cover: /images/blog/digitale-geltungsbereichskarten/gb1.jpg
created: 2023-01-29
slug: gbkarten
tags:
  - maps
  - passengerinformation
  - routing
frontpage: true
frontpageImage: /images/blog/digitale-geltungsbereichskarten/gb1.jpg
frontpageWeight: 0
published: true
---
## Background

As a frequent train rider, I not only enjoy the financial benefits of the Swiss General Abonnement, but also the ease of travel it offers me. It's wonderfully convenient to simply get on and go without buying a ticket. This way of traveling works on all the routes I use regularly, for example on the way to the office or to customers. But what about when I plan an excursion to more remote corners of Switzerland on vacations or weekends? Does the GA apply to the bus that takes me to the Hotel Chasseral at the weekend? Or can I take the gondola to Brambrüesch for free? If you already have a GA, you naturally want to use it for free travel in your free time as well. But the Generalabonemment is not generally valid for the small routes.

![Brambrüesch](/images/blog/digitale-geltungsbereichskarten/gb3.jpg)

*With the general season ticket, many mountain railroads can be used free of charge. For the trip to the Brambrüesch near Chur there is a 50% discount. Photo: Lino Schmid via Wikimedia Commons.*

To enable travelers to take into account the validity of the GA travelcard as well as the validity of other season tickets when planning a trip, SBB has been producing the so-called validity area cards for around 20 years. These cards, on which as much information as possible has been reproduced, have been meticulously hand-crafted to a high standard of quality. Published as PDF or in the form of handy foldable print cards, they formed an important source of information in Swiss public transport. And indeed, the area of validity maps tell me that when I travel up the Brambrüesch with the GA, I get, if not a free ride, at least a discount. Even at the Chasseral, I can imagine on closer inspection that my GA is valid somewhere up there. But is the branch from the Col to the hotel also included or not? With such details, the static maps then came to their limits.

The desire to show even more details on the maps was one of the drivers for our digital scope map project. In addition, a PDF map no longer met the requirements for digital information transfer. Today, it is taken for granted that a digital map can be easily moved and zoomed, and that information can be retrieved by clicking on the map. These options must be available on a large screen as well as on a tablet or smartphone. You can't do any of that with a PDF. Perhaps the most important reason for replacing the previous maps and the associated manual maintenance of the content was the fact that the information on the areas of validity already existed in other databases, where it was used as the basis for pricing and ticket sales, and where a lot of energy was therefore already invested in updating it on an ongoing basis. So what could be more obvious than to use these databases for automated production of the validity area cards as well?

## The Project

Those who know other solutions from geOps can already guess which databases we use for the production of the scope cards. It is NOVA.

![Tarifverbundkarte](/images/blog/digitale-geltungsbereichskarten/gb2.png)

*With the data from NOVA we had already realized the Switzerland-wide calculation of tariff zone boundaries as well as the creation of the tariff association map.*

NOVA covers all tariff applications from price inquiry to sales and control. Transport companies can link their information systems with NOVA via interfaces. In addition to much other fare information, it is also stored for each line (and each operator) which subscription products are fully valid or bring a reduction. In a project with Alliance Swiss Pass we were able to realize the connection of NOVA to the data of the public transport network of Switzerland. In addition to Alliance Swiss Pass, an advisory group consisting of representatives of numerous transport companies was involved in the implementation.

## The Solution

All information in NOVA is bound to so-called tariff edges. An edge is defined by the nodes, i.e. the stops, at the beginning and at the end. In the case of ambiguous routes, additional intermediate nodes are specified in the form of real stops or pseudo-stations, simple points on the route. For a trip from Olten to Bern via the new line, for example, Olten and Bern are the start and end nodes and, in order to unambiguously define the trip, Bahn2000 is also specified as an intermediate node. As tariff information, which we use for the validity area cards, is deposited at these edges, whether GA, Halbtax, seven25 or various other subscriptions are completely or partially valid. Due to the modeling, edges are first of all only straight connecting lines between the nodes. To obtain an accurate cartographic representation from them, a few steps are necessary. 

First of all, a topologically and geographically correct network of all means of public transport is needed. We maintain such a network as part of our work for Trafimage of the SBB. The network contains the exact line routes for all means of transport in different levels of generalization, i.e. with suitability for different map scales. The network contains the same nodes or stops that NOVA uses. At least they are largely the same, because unfortunately there are still differences from time to time in which numbers different systems use to identify a stop.

As a second component a routing engine is needed, which can determine the geographical course of the complete line by specifying two or three nodes. The routing engine has also been developed by us for a long time and is used for numerous applications.

With these components, theoretically, the tariff information can be mapped. At least that is the theory. In practice, there are still numerous problem cases that have to be intercepted by special solutions or heuristics. The already mentioned deviating station numbers are an example. Special connections such as airport buses or connections abroad, which are correct in terms of tariffs but only cause confusion on a map and therefore have to be filtered out, are another. Not least thanks to the intensive support of the transport companies involved, most of the problems could be solved.

![Geltungsbereiche in der Jungfrauregion](/images/blog/digitale-geltungsbereichskarten/gb1.jpg)

*In the Jungfrau Railways area, the area of validity map shows in great detail where the GA is valid in full, in part or not at all.*

In the end, only a few constellations remained that are not or not yet solved, and where the map thus does not display complete information. An example of this are the sports buses in some winter sports areas. Since these buses are free of charge per se, it was never clearly defined in NOVA whether the GA is now recorded as valid on these buses or not. In this case, it was decided to take the data as it is and thus to accept different representations between individual municipalities. Another example is shipping on Lake Constance. This is the only region where the validity of a season ticket depends on the direction in which an edge is navigated. While the GA is valid on the trip from the island of Mainau to Meersburg, the full fare is due on the trip in the other direction, and this, mind you, with one and the same operator of the line. IT and cartography had to capitulate to such a low degree of systematics. For Lake Constance, we therefore only show gray lines and the note that the validity must be requested on site (or alternatively by fax machine).

## Outlook

With a few exceptions, the validity map in its current state shows the validity of the various subscriptions for the routes in Switzerland correctly and in great detail. 
Future updates will probably also eliminate the last inaccuracies.  At SBB, the map is already integrated into [the website](https://www.sbb.ch/en/travelcards-and-tickets/railpasses/ga/ga-travelcard-area-validity.html) in several places. In [Trafimage's web map portal](https://maps.trafimage.ch/ch.sbb.geltungsbereiche?baselayers=ch.sbb.geltungsbereiche.mvp.data&lang=en), the map is available independently. In this variant, the function for searching for stops and other locations is particularly practical. Other transport companies can also use the map free of charge via a programming interface. The system of mapping fare information from NOVA to the route network also provides a good basis for further applications. A card for [Swiss Travel System](https://www.mystsnet.com/) subscriptions is already in preparation. Companies wanting to use the map on their websites can do so using the API documented [here](https://jsdoc.maps.trafimage.ch/).