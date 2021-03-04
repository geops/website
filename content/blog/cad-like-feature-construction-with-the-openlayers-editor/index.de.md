---
title: CAD-like Feature Construction with the OpenLayers Editor
summary: >-
  When editing vector features in a web GIS map one often needs support for
  precise drawing. Snapping to existing features of external data (using WFS or
  other vector features) was long available in OpenLayers Editor but it still
  lacked guide line support.

  We are pleased to announce that guide lines can now be generated automatically by OpenLayers Editor whilst a feature is drawn. Guide lines for the first run offer support for drawing right angled features or features in parallel to other features."
slug: cad-like-feature-construction-with-the-openlayers-editor
---
On many occasions one needs to **align new features to existing features** in cadastral mapping applications. One example would be that the user is tracing a building from an orthophoto and wants to align the building with existing geometries. This is an error prone task in web GIS because they don't offer snapping features that are known from CAD software.

We did now extend OpenLayers Editor's capabilities by supporting guide lines including snapping on a recent hack day. Therefore a visual guide line is presented to the user running parallel to existing features on the map. By moving the mouse nearby, the user can trigger snapping and draw adjacent features **precisely in parallel** to others. The guide follows the user's sketch as vertices are added and provides assistance right where it is needed without cluttering the editor too much.

![Adding vertices in parallel in an OpenLayers based web GIS](/images/blog/cad-like-feature-construction-with-the-openlayers-editor/parallel.png) Following the angles of an existing feature.

In addition it is often required to **draw right angles**. The guide based system does also offer support here by drawing guide lines orthogonal to the last drawn line segment. Thus the user can easily snap new vertices in the right angle to the last segment or choose to draw in another angle. Drawing in arbitrary angles triggers new guide lines to continue drawing in right angles whenever desired.

![Drawing right angled features in an OpenLayers based web GIS to get orthogonal features](/images/blog/cad-like-feature-construction-with-the-openlayers-editor/orthogonal.png) Placing a vertex using guides to archive perfect right angles.

Technically, the system which drives the **guide lines and guide points** is flexible enough to use parallel drawing and orthogonal drawing at the same time. Therefore orthogonal features can be drawn that align with existing features. There are **two demos** available that allwo to test the new functionality, one which [uses local storage](http://ole.geops.de/) for all features drawn and another one with [MapFish and PostGIS](http://ole.geops.de/mapfish) backend.

The guided drawing can be extended on request to **support individual needs** such as snapping to WFS services or drawing line segments with pre-defined lengths. We are always looking for a challenge to push the limits for web GIS and business process integration even further.