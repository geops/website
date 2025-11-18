---
title: mobility-toolbox-js 3.0.0
summary: >-
  mobility-toolbox-js serves as the primary gateway for developing geospatial
  web applications using our geOps in-house APIs.


  This project has existed for years, but version 3 brings massive improvements in terms of development experience, ease of use and integration into existing applications.
author: "Daniel Marsh-Hunn,  Olivier Terral "
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
All developments at **[geOps](https://geops.com)** are based on open source software. Besides using existing mapping libraries  [OpenLayers](https://openlayers.org/) and [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/), we also create our own software packages, such as **[mobility-toolbox-js](https://mobility-toolbox-js.geops.io/)**.  

**[mobility-toolbox-js](https://mobility-toolbox-js.geops.io/)** serves as the primary gateway for developing geospatial web applications using our **[geOps in-house APIs](https://developer.geops.io/).**  

This project has existed for years, but version 3 brings massive improvements in terms of development experience, ease of use and integration into existing applications.

The code overhaul for version 3 was done under the motto  **DO NOT REINVENT THE WHEEL**:

* Remove all application specific code that pollutes the codebase and makes the library unmaintainable
* Remove fancy code that’s architecturally good but nobody understands
* Remove the unintelligible or cumbersome documentation
* Remove custom APIs that can be done using [OpenLayers](https://openlayers.org/), [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) or other open source project like [geoblocks/ol-maplibre-layer](https://github.com/geoblocks/ol-maplibre-layer)

**mobility-toolbox-js** version 3 has been refactored to be as close to other mapping libraries as possible. This makes development with mobility-toolbox-js feel very familiar for developers who use very popular open source libraries, such as [OpenLayers](https://openlayers.org/) or [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)

The result is a product that **simply works**, that can be **used in every context** and for which **no extra API knowledge is necessary**.

The following example demonstrates the simplicity of adding realtime data using our [geOps Realtime API](https://geops.com/de/solution/livemap) in an existing OpenLayers application:

![Example of code how to add geOps Realtime  API data](/images/blog/mobility-toolbox-js-3-0-0/code-example.png "Example of code how to add geOps Realtime  API data")

You can find this example and along with several others on [the official website](https://mobility-toolbox-js.geops.io/examples) . Also check out the [documentation](https://mobility-toolbox-js.geops.io/doc) which also received a major shake-up for this new version.

We use **mobility-toolbox-js** in all our applications. A great example is our [mobility-web-component](https://mobility-web-component.geops.io/geops-mobility) , a web component  that encapsulates all the [geOps APIs](https://developer.geops.io/) in one HTML element configurable by attributes. You can see it live in action in our [RVF website](https://www.rvf.de/fahrtinfo/netzplan):

![geOps application:  RVF Netzplan](/images/blog/mobility-toolbox-js-3-0-0/rvf-site.png "geOps application:  RVF Netzplan")

Our  famous [live map for S-Bahn münchen](https://www.s-bahn-muenchen.de/de/fahren/live-map) also uses **mobility-toolbox-js**:

![geOps application: S-Bahn München Live Map](/images/blog/mobility-toolbox-js-3-0-0/tralis-live-map.png "geOps application: S-Bahn München Live Map")

We hope our efforts are making life easier for spatial web developers and improving the overall quality of spatial web applications.