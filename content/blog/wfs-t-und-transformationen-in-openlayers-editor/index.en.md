---
title: WFS-T and transformations in OpenLayers Editor
summary: The OpenLayers Editor OLE now also supports the WFS-T protocol for
  Geodata processing
created: 2012-07-02
slug: wfs-t-and-transformations-in-openlayers-editor
tags:
  - developers
  - maps
published: true
---

Der [OpenLayers Editor](http://ole.geops.de) kann nun direkt an GeoServer als Persistenzschicht angebunden werden. Hierbei kommuniziert OLE mit GeoServer über WFS-T, um Geometrien zu laden und zu speichern.Nachdem in GeoServer über die grafische Oberfläche ein WFS konfiguriert wurde, bedarf es also nur noch weniger Zeilen JavaScript-Code, um mit OLE einen leistungsfähigen Client zur Geodatenbearbeitung anzubinden. Laden mittels Bounding-Box und Persistieren geänderter oder angelegter Geometrien geschieht dann automatisch über das standardisierte WFS-T Protokoll.

![Feature Transformation mit OpenLayers Editor](/images/blog/wfs-t-und-transformationen-in-openlayers-editor/ole-feature-transformation.png)

Zudem fanden Transformationen nun den Weg in OLE. Geometrien lassen sich damit direkt im Browser verschieben, drehen und skalieren.
