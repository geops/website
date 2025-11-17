---
title: mobility-toolbox-js 3.0.0
summary: >-
  All developments at geOps are based on open source software. Besides using
  existing mapping libraries  OpenLayers and MapLibre GL JS, we also create our
  own software packages, such as mobility-toolbox-js.  


  mobility-toolbox-js is meant to be the front door to build geospatial web applications using our  geOps in-house APIs.


  If this project exists for years now, the version 3 brings  a massive  improvement in terms of ease of development and integration into existing applications.
author: "Daniel Marsh-Hunn & Olivier Terral "
cover: /images/blog/mobility-toolbox-js-3-0-0/cover-image.png
created: 2025-11-17
slug: mobility-toolbox-js-v3
tags:
  - developers
  - mobility
  - geops
  - javascript
  - maps
  - realtime
frontpage: true
frontpageImage: /images/blog/mobility-toolbox-js-3-0-0/cover-image.png
published: true
---














All developments at dsd**[geOps](https://geops.com)** are based on open source software. Besides using existing mapping libraries  [OpenLayers](https://openlayers.org/) and [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/), we also create our own software packages, such as **[mobility-toolbox-js](https://mobility-toolbox-js.geops.io/)**.  

**[mobility-toolbox-js](https://mobility-toolbox-js.geops.io/)** is meant to be the front door to build geospatial web applications using our **[geOps in-house APIs](https://developer.geops.io/).**  

If this project exists for years now, the version 3 brings  a massive  improvement in terms of ease of development and integration into existing applications.

We build the version 3 with the motive  **DO NOT REINVENT THE WHEEL**:

* Exit all the application specific code that polute the code and makes the library unmaintanable 
* Exit fancy code that are architecturally good but that nobody understands
* Exit the unintelligible documentation.
* Exit custom  API that can be done using [OpenLayers](https://openlayers.org/), [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) or other OpenSource project like [geoblocks/ol-maplibre-layer](https://github.com/geoblocks/ol-maplibre-layer)

**mobility-toolbox-js** version 3 has been refactored be as close to the other mapping libraries as possible.

This makes development with mobility-toolbox-js feel very familiar for developers who alread y knows [OpenLayers](https://openlayers.org/) and [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)

Finally we get something that **simply works**, something that **can be used in every context**, something that **do not need extra API knowledge**.

As an example, in your existing OpenLayers application, you can display realtime data  using our geOps Realtime API. simply like this:

![Example of code how to add realtime layer](/images/blog/mobility-toolbox-js-3-0-0/code-example.png "Example of code how to add realtime layer")





You can find this example and  and  many more on [the official website](https://mobility-toolbox-js.geops.io/examples) . You can also check the [documentation](https://mobility-toolbox-js.geops.io/doc) who has  received a major shake-up for this new version.

We use this library as basis for all our applications, like our [mobility-web-component](http://mobility-web-component) , a web component  that encapsulate all the [geOps APIs](https://developer.geops.io/) in one HTML element configurable by attributes. You can see it live in action in our [RVF client website](https://www.rvf.de/fahrtinfo/netzplan):

![RVF Netzplan](/images/blog/mobility-toolbox-js-3-0-0/rvf-site.png "RVF Netzplan")



Our  famous live map for S-Bahn münchen also uses mobility-toolbox-js:

![S-Bahn München Live Map](/images/blog/mobility-toolbox-js-3-0-0/tralis-live-map.png "S-Bahn München Live Map")



We hope our efforts are making life easier for spatial web developers and improving the overall quality of spatial web applications.