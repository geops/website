---
title: OpenLayers Editor released
summary: geOps releases the source code of OpenLayers Editor under a FreeBSD
  license. OpenLayers Editor offers a toolbar for precise and efficient editing
  of geodata in the browser.
created: 2011-08-20
slug: openlayers-editor-released
tags:
  - maps
  - developers
published: true
---
[![OLE DEMO](/images/blog/openlayers-editor-released/ole-demo-screenshot.png "OLE Demo")](http://ole.geops.de).

OpenLayers Editor is an easy to use JavaScript library that brings geodata digitizing functions to the browser. Besides basic capturing of point, line and polygon data, OpenLayers Editor supports uploading of shape files, snapping, merging, splitting and validation of geometries.

The toolbar and all the functions attached to it are based exclusively on [OpenLayers](http://openlayers.org "openlayers.org") classes. No other client-side libraries like ExtJS or jQuery are needed. However some functions like validating geometries rely on server-side processing, e.g. with [PostGIS](http://postgis.org "PostGIS").

Drupal users can take advantage of the [OpenLayers Editor module](http://drupal.org/project/ole) which integrates well with the [OpenLayers module](http://drupal.org/project/openlayers) and provides server-side processing if the [PostGIS module](http://drupal.org/project/postgis) is installed.

Source Code and documentation are available on [Github](https://github.com/geops/ole "OLE auf Github"). A [Demo](http://ole.geops.de "OpenLayers Editor Demo") as well as a [video](http://www.youtube.com/watch?v=eJQIN7j2r9o "YouTube Video Geodata editing") show the toolbar in action.