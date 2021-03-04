---
title: Unbekannte Wälder in Google Maps
summary: Die Version 3 der Google Maps API erlaubt die Anwendung
  benutzerdefinierter Stildefinitionen für einzelne Kartenlayer. Einige Versuche
  mit der neuen API innerhalb OpenLayers zeigten, dass Wälder bei Google mit
  deutlich mehr Details vorliegen, als es Google Maps auf den ersten Blick
  vermuten lässt.
created: 2011-01-13
slug: unbekannte-walder-in-google-maps
tags:
  - maps
  - environment
published: true
---

Viele grössere Waldgebiete werden bei Google Maps als zusammenhängende unstrukturierte Flächen abgebildet. Für den uns naheliegenden Schwarzwald ist das besonders auffällig. Über hunderte Quadradratkilometer scheint es nur Wald und keine offenen Flächen zu geben. Doch dieses Bild trügt. Die zusammenhängende Fläche repräsentiert nicht Wald sondern die Naturparks Nord- und Südschwarzwald. Diese sind bei Google als POIs erfasst und verdecken die eigentliche Waldfläche, ähnlich grün eingefärbt wie der Wald selbst.

Mit den Möglichkeiten der Version 3 von Google Maps API lassen sich nun die POIs ausblenden. Und siehe da, Google bietet einen sehr schönen Detailreichtum in der Darstellung der Waldflächen.

Sehen Sie sich den Effekt in unserem [OpenLayers-Test](https://www.geops.de//sandbox/openlayers/gmapstyled/gmapstyled.html "Google Custom Styles in OpenLayers") an. Der Layer _Google Styled_ zeigt die detaillierten Waldflächen, während der Layer _Google Physical_ die Standardansicht von Google Maps wiedergibt. Der Quellcode des Tests basiert auf einem [Beitrag in der OpenLayers-Liste](http://osgeo-org.1803224.n2.nabble.com/Google-v3-Styles-Maps-in-OpenLayers-tt5653950.html#a6011391 "OpenLayers Liste").
