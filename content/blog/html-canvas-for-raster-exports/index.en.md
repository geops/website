---
title: Determining maximum HTML Canvas sizes for raster exports
summary: Several geOps applications have features to export high-resolution maps
  as raster images. This is handled in the javascript frontend by creating a
  temporary HTML Canvas element. We explain how to calculate the maximum size of
  the Canvas and by this the resolution and size for printouts.
author: Daniel Marsh-Hunn
cover: /images/blog/determining-maximum-html-canvas-sizes-for-raster-exports/offscreencanvas_item.png
created: 2021-12-22
slug: html-canvas-for-raster-exports
tags:
  - developers
  - processes
  - javascript
published: true
---
Several geOps applications (e.g. [fare networks](https://maps.trafimage.ch/ch.sbb.tarifverbundkarte.public), [mapset](https://editor.mapset.io/)) have features to export high-resolution maps as raster images. This is handled in the javascript frontend by creating a temporary HTML Canvas element containing the desired map extent with the desired resolution and exporting the canvas in a defined raster format (png, jpg, etc.). The maximum resolution depends on multiple factors though, including the browser configuration, WebGL settings and hardware components. If the canvas size limit is exceeded, the rendered canvas is unusable for exporting. Canvas size limits therefore need to be collected before the export canvas is created. Today we’re going to focus on how to acquire maximum HTML Canvas sizes for raster exports. 

Calculating maximum canvas sizes can be heavy on performance, which is why this is done once and the result is stored in the browser local storage. 

In our first approach the maximum canvas size was calculated using a script from this [fiddle](https://jsfiddle.net/1sh47wfk/1/). Browsers reduce the size of the WebGL draw buffer for large canvases. This script compares the canvas width and height to the draw buffer width and height in a recursive, binary-search like loop until the values correspond, returning the maximum width and height. 

However, this approach turned out to be incompatible on iOS devices. On iOS, WebGL does not update the canvas dimensions during the binary search in the script, causing it to loop infinitely and fail the calculation. Therefore a different solution was necessary. 

Luckily there is an npm package that takes care of the heavy lifting for us. [Canvas-size](https://www.npmjs.com/package/canvas-size) runs tests using a set of predefined size values for a variety of  browser and platform combinations. Tests validate the ability to read pixel data from canvas elements of the predefined dimensions by decreasing canvas height and/or width until a test succeeds.  This approach completely avoids using the WebGL parameters such as the draw buffer, and therefore runs smoothly on all devices including iOS. Furthermore, the calculation is faster and less prone to error. 

The package also includes methods for asynchronous testing by using [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) and [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas). These tests are run on a separate thread, which can prevent the browser from becoming unresponsive while testing on the browser's main thread. This feature may prove useful in future projects.

![offscreencanvas](/images/blog/determining-maximum-html-canvas-sizes-for-raster-exports/offscreencanvas.png)