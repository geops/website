---
title: Webkarten als PDF exportieren und drucken
summary: Schon seit einiger Zeit bieten einige unserer Apps den Export unserer Karten im PDF-Format. Dieser Artikel stellt unsere Lösungen für diverse Neuerungen  dieser Funktion vor.
author: Daniel Marsh-Hunn
cover: /images/blog/export-maps-pdf/map_to_pdf.png
created: 2024-06-20
slug: webkarten-als-pdf-exportieren-und-drucken
tags:
  - developers
published: true
---
In unseren Projekten implementieren wir häufig Karten für interaktive Anwendungen im Web. Hin und wieder möchte ein Kunde aber auch eine statische Version der Karten anbieten, welche unter anderem für den Druck von Karten nützlich ist. Daher bieten einige geOps-Anwendungen die Möglichkeit, Karten als PDF-Dateien herunterzuladen. Hier nehmen wir als Beispiele für diese Funktion die Karte der [Geltungsbereiche](https://maps.trafimage.ch/ch.sbb.geltungsbereiche) von Alliance SwissPass und die Karte der Mitglieder von [RAILplus](https://www.railplus.ch/de/partner-bahnen).

Dieser Artikel stellt unsere Lösungen für die folgenden Funktionen vor:
* Erzeugen von clientseitigen PDFs aus einer Webkarte
* Hinzufügen weiterer Kartenelemente (Titel, Legende etc.) mit benutzerdefinierten Schriftarten zur Karte
* Hinzufügen eines dynamischen Maßstabsbalkens in die Karte
* Abgeschnittene Beschriftungen am Kartenrand entfernen
* Verwendung einer Kartenebene zur Erzeugung der Kartenlegende

Technisch gesehen gibt es eine hervorragende Open Source Javascript-Bibliothek für die clientseitige PDF-Erzeugung: [jsPDF](https://github.com/parallax/jsPDF). Diese Bibliothek bietet eine benutzerfreundliche API und eine ausführliche [Dokumentation](https://rawgit.com/MrRio/jsPDF/master/docs/index.html). Zum Zeitpunkt der Erstellung dieses Artikels hat jsPDF 4,6k Forks und 28,6k Sterne auf GitHub, was für die Popularität der Bibliothek spricht. 

Für den eigentlichen Export der Karte verwenden wir die Komponente [CanvasSaveButton](https://react-spatial.geops.io/?layers=swiss.boundaries&baselayers=basebright.baselayer,basedark.baselayer&mode=custom&x=876887.69&y=5928515.41&z=5#canvassavebutton) aus [react-spatial](https://react-spatial.geops.io/), einer von geOps entwickelten und gepflegten React-Bibliothek. Die Komponente gibt die Karte in der gewünschten Größe und Auflösung als HTML-Canvas zurück. Nach der Erstellung der PDF-Instanz kann das Canvas dann als Bild in das PDF-Dokument eingefügt werden. Das Dokument wird dann als PDF im gewünschten Format exportiert.

```js
const doc = new JsPDF({
  orientation: "landscape",
  unit: "pt",
  format: "A4",
});

doc.addImage(canvas, "JPEG", 0, 0, 595, 842);

doc.save("my_pdf_map.pdf");
```

Aber natürlich braucht eine Karte unter anderem auch eine Legende, einen Titel und einen Maßstabsbalken. Für unseren Anwendungsfall erstellen wir ein Overlay-SVG mit allen Elementen, die wir benötigen, und fügen es dem Canvas-Kontext hinzu.

Um die Automatisierung des Verfahrens zu verbessern, fügen wir einige vordefinierte Platzhalter in das SVG ein, die wir bei der Erstellung der PDF-Datei ersetzen können, was für die Aktualisierung von Veröffentlichungsdatum und Autoren nützlich ist.


```js
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      window.setTimeout(() => {
        resolve(img);
      }, 2000);
    };
    img.onerror = reject;
    img.src = src;
  });

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

Um individuelle Schriftarten in der Kartenlegende verwenden zu können, importieren wir die heruntergeladene .woff-Datei als base64-String und fügen diesen in den \<defs\>-Tag des SVG-Baums als *font-face* ein.


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

Für die RAILplus-Karte reicht es aus, einen Download für die ganze Schweiz anzubieten, also mit beständigem Kartenausschnitt und Zoom. Daher können wir einen statischen Maßstabsbalken zum Overlay-SVG hinzufügen. Für die Karte der Geltungsbereiche soll es zusätzlich möglich sein, den Kartenausschnitt und die Zoomstufe vom Nutzer definieren zu lassen. Da sich der Maßstabsbalken mit dem Breitengrad und der Zoomstufe ändert, muss dieser hier dynamisch erzeugt werden.

Um den dynamischen Maßstabsbalken zu erstellen, fügen wir zunächst eine [OpenLayers Scaleline-Control](https://openlayers.org/en/latest/apidoc/module-ol_control_ScaleLine-ScaleLine.html) zur Karte hinzu, wenn wir das Export-Canvas erzeugen. Anschließend wird das gerenderte HTML vom Scaleline-Element abgerufen und das CSS angepasst. Die Breite des Maßstabsbalkens ändert sich je nach aktuellem Breitengrad und Zoomfaktor, so dass wir diese dynamisch an die Export Auflösung anpassen müssen. Schließlich verwenden wir die [html2canvas](https://html2canvas.hertzen.com/)-Bibliothek, um das HTML in ein Canvas-Element umzuwandeln und es an einer vordefinierten Position in den Canvas-Kontext der Karte einzufügen.

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
Eine weitere Verbesserung, die wir für alle PDF-Exporte eingeführt haben, ist ein Verdrängungslayer auf dem Kartenrahmen. Dieser [Maplibre-Style-Layer](https://maplibre.org/maplibre-style-spec/layers/) wird während des Exports dynamisch an die Spitze der Karten-Ebenen hinzugefügt. Sie enthält ein einzelnes, unsichtbares Rechteck, das sich über den gesamten Kartenrand erstreckt. Dadurch wird verhindert, dass abgeschnittene Beschriftungen am Rand der Karte erscheinen, und es werden nur die vollständig sichtbaren Beschriftungen wiedergegeben.

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

Anstelle einer Legende mit allen RAILplus-Mitgliedern am Kartenrand hat die RAILplus-Karte für jedes Mitglied einen Kasten mit dem Logo und dem Namen zusammen mit einer Verbindungslinie zu den zugehörigen Strecken auf der exportierten Karte. Wir haben uns entschieden, die Boxen und Linien als Maplibre-Ebene hinzuzufügen, anstatt sie in die Legenden-SVG zu integrieren. Auf diese Weise können wir die Logo-SVGs in einer einzigen Quelle verwalten. Die Ebene ist in der Webkarte standardmäßig unsichtbar, aber für den PDF-Export aktiviert.

![Karte der Schweiz mit den RAILplus-Mitgliedern.](/images/blog/export-maps-pdf/railplus-members.png "Karte der RAILplus-Mitglieder")

Das war's für heute. Wir hoffen, dass wir einige Anregungen für die Erstellung deiner eigenen statischen Karten-Exporte geben konnten, und vielleicht auch einige Ratschläge für deine benutzerdefinierten Exportlösungen.
