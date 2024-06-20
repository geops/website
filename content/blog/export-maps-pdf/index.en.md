---
title: Export and print web maps as PDF
summary: For some time now, some of our apps have offered the export of our maps in PDF format. This article presents our solutions for some new features of this feature 
author: Daniel Marsh-Hunn
cover: /images/blog/export-maps-pdf/map_to_pdf.png
created: 2024-06-20
slug: export-and-print-web-maps-as-pdf
tags:
  - developers
published: true
---
In our projects, we often implement maps for interactive applications on the web. But every now and then a client still needs to offer a static version of the maps. These are useful for printing maps, among other things. Therefore, some geOps applications offer a way to download maps as PDFs. Here we use the map of [Areas of validity](https://maps.trafimage.ch/ch.sbb.geltungsbereiche?lang=en) from Alliance Swisspass and the map of [RAILplus](https://www.railplus.ch/de/partner-bahnen) members as examples of this feature.

This article presents our solutions for the following features:
* Generate client-side PDFs from a web map
* Add further map elements (title, legend etc.) with custom text fonts to the map
* Add a dynamic scale bar to the map
* Remove truncated labels from the map’s edge
* Use a map layer to generate the map legend

In terms of technology, there is an excellent Open Source JavaScript library for generating client-side PDFs: [jsPDF](https://parall.ax/products/jspdf). This library offers a user-friendly API along with detailed [documentation](https://rawgit.com/MrRio/jsPDF/master/docs/index.html). At the time of writing this article, jsPDF has 4.6k forks and 28.6k stars on github, demonstrating the popularity of the library.

For the actual export of the map, we use the [CanvasSaveButton](https://react-spatial.geops.io/?layers=swiss.boundaries&baselayers=basebright.baselayer,basedark.baselayer&mode=custom&x=876887.69&y=5928515.41&z=5#canvassavebutton) component from [react-spatial](https://react-spatial.geops.io/), a geOps developed and maintained React library. The component returns the map with the desired size and resolution as an HTML canvas. After creating the PDF instance, the canvas can then be added to the PDF document as an image. The document is then exported as PDF in the desired format.

```js
const doc = new JsPDF({
  orientation: "landscape",
  unit: "pt",
  format: "A4",
});

doc.addImage(canvas, "JPEG", 0, 0, 595, 842);

doc.save("my_pdf_map.pdf");
```

But of course, a map also needs a legend, a title and a scale bar among other things. For our use case, we create an overlay SVG with all the elements we need and add it to the canvas context.

To enhance the procedure automation, we place some predefined placeholder strings in the SVG that we can replace when generating the PDF, which is useful for updating the release date and the author.


```js
const ctx = canvas.getContext("2d");
const svgString = await fetch(overlayImageUrl).then((response) =>
  response.text(),
);

let updatedSvg = svgString.slice(); // Clone the string

Object.keys(templateValues).forEach((key) => {
  const value =
    typeof templateValues[key] === "function"
      ? templateValues[key]()
      : templateValues[key];
  updatedSvg = updatedSvg.replace(`***${key}***`, value);
});


const svgDoc = new DOMParser().parseFromString(
  updatedSvg,
  "application/xml",
);

updatedSvg = new XMLSerializer().serializeToString(svgDoc);
const blob = new Blob([updatedSvg], { type: "image/svg+xml" });
const url = URL.createObjectURL(blob);
const image = await loadImage(url);
ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
```

To be able to use custom fonts in the map legend, we import the downloaded .woff file as a base64 string and insert it into the <defs> tag of the SVG tree as *font-face*.


```js
function toBase64 (blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}

const response = await fetch(woffFile);
const blob = await response.blob();
const fontBase64 = await toBase64(blob);
const fontFaceDefString = `
  <defs xmlns="http://www.w3.org/2000/svg">
    <style type="text/css">
      @font-face {
        src: url(${fontBase64});
        font-family: 'My-Custom-Font';
      }
    </style>
  </defs>
`;

const fontDefsElement = new DOMParser().parseFromString(
  fontFaceDefString,
  "application/xml",
).documentElement;
svgDoc.documentElement.insertBefore(
  fontDefsElement,
  svgDoc.documentElement.firstChild,
);
```

For the RAILplus map, it is sufficient to offer a download for the whole of Switzerland, i.e. with a constant map extent and zoom. We can therefore add a static scale bar to the overlay SVG. For the map of the Area of validity, it should also be possible for the user to define the map section and the zoom level. As the scale bar changes with the latitude and zoom level, it must be generated dynamically here.

To add the dynamic scale bar, we first add an [OpenLayers Scaleline Control](https://openlayers.org/en/latest/apidoc/module-ol_control_ScaleLine-ScaleLine.html) to the map when generating the export canvas. We then get the rendered HTML from the Scaleline control and adjust the CSS. The width of the scale bar changes depending on the current latitude and zoom, so we need to adjust it to the export resolution on the fly. Finally we use the [html2canvas](https://html2canvas.hertzen.com/) library to convert the HTML to a canvas element, and also add it to the map canvas context at a predefined position.

```js
const olScaleline = new ol.control.ScaleLine();
const mapToExport = new ol.Map({
  target: elt,
  controls: [olScaleline],
});

...

const pixelRatio = window.devicePixelRatio || 1;
const scaleLineElement = olScaleline?.element?.children[0];
const width = parseInt(scaleLineElement.style.width, 10);
  scaleLineElement.style.width = `${(width * resolution) / pixelRatio}px`;
  scaleLineElement.style.height = `${(10 * resolution) / pixelRatio}px`;
scaleLineElement.style["font-size"] = `${(6 * resolution) / pixelRatio}px`;
scaleLineElement.style["border-width"] = `${(1 * resolution) / pixelRatio}px`;
scaleLineElement.style["border-color"] = "black";
scaleLineElement.style["font-color"] = "black";
scaleLineElement.style["font-family"] = "My-Custom-Font,Arial,sans-serif";
scaleLineElement.style.display = "flex";
scaleLineElement.style["align-items"] = "center";
scaleLineElement.style["justify-content"] = "center";

ctx.drawImage(scaleLineCanvas, x, y);
```

Another improvement we introduced for all PDF exports is a displace layer on the map frame. This [MapLibre style layer](https://maplibre.org/maplibre-style-spec/layers/) is added dynamically to the top of the layer stack during the export. It contains a single, invisible rectangle feature running all along the map’s edge. This prevents any truncated labels from appearing at the edge of the map, only rendering the fully visible ones.


```js
const geoJson = new ol.format.GeoJSON();
const extent = maplibreMap.getBounds().toArray();
const displaceSource = {
 type: "geojson",
 data: {
    type: "FeatureCollection",
    features: [
      geoJson.writeFeatureObject(
        new Feature(
          new LineString([
            extent[0],
            [extent[0][0], extent[1][1]],
            extent[1],
            [extent[1][0], extent[0][1]],
            extent[0],
          ]),
        ),
      ),
    ],
  },
};
const displaceLayer = {
 id: "print_frame_displacement",
 type: "symbol",
 source: "printframe",
 metadata: { "geltungsbereiche.filter": "printframe" },
 minzoom: 0,
 maxzoom: 24,
 layout: {
  "symbol-placement": "line",
  "symbol-spacing": 1,
  "text-font": ["SBB Web Roman"],
  "text-field": "x",
  "text-size": 4,
  "text-max-angle": 1000,
  "text-pitch-alignment": "viewport",
  "text-rotation-alignment": "viewport",
  visibility: "visible",
 },
 paint: { "text-opacity": 0 },
};
maplibreMap.addSource("printframe", displaceSource);
maplibreMap.addLayer(displaceLayer);
```

Instead of a legend with all RAILplus members at the edge of the map, the RAILplus map has a box for each member with the logo and name along with a connecting line to the associated routes on the exported map. We decided to add the boxes and lines as a Maplibre layer instead of integrating them into the legend SVG. This way we can manage the logo SVGs in a single source. The layer is invisible in the web map by default, but activated for PDF export.

![Karte der Schweiz mit den RAILplus-Mitgliedern.](/images/blog/export-maps-pdf/railplus-members.png "Karte der RAILplus-Mitglieder")

That’s all for today. We hope to have provided some inspiration to create your own static map exports, and maybe also some advice for your own custom export solutions.