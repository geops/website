---
title: New functions in the GeoCMS "Cartaro"
summary: >+
  With our online tool Cartaro, spatial information can be conveniently managed
  and published on a web map at the push of a button. The spatial reference of
  the managed data is at the centre of our Content Management System (CMS),
  which is why we also call Cartaro "GeoCMS". Especially on behalf of the SBB,
  we have recently intensively developed our GeoCMS. This blog post gives an
  overview of the most important new functions. Before that, the main functions
  of Cartaro are briefly summarised.

cover: /images/blog/cartaro_blog.jpg
created: 2021-07-28
slug: cartaro
published: false
---
## A short profile

The core function of Cartaro is the automatic generation of data entry forms based on database tables. Based on the data model, Cararo automatically generates a [JSON schema](https://json-schema.org/), which is then "translated" into a form by the client. Standard fields, such as checkboxes, input fields and drop-downs, can be easily replaced by overwriting the schema with one of the numerous Cartaro widgets, e.g. for image upload. Additional widgets for any data format can be flexibly integrated into Cartaro and the fields nested for the sake of clarity. Geometry editing is done via the map view. Thanks to the integrated [OpenLayers Editor](https://openlayers-editor.geops.de/), any geometries can be created, edited and aligned with snapping tools.

![](/images/blog/new-functions-in-the-geocms-cartaro/cartaro.jpg)

## Additional information for any objects

In Cartaro, new geographical objects can be created, edited and provided with thematic attributes. However, existing objects with known geometry can also be enriched with additional information. For this purpose, we have connected Cartaro to our data hub, where we keep, among other things, worldwide station data and traffic networks in different levels of generalisation. In this way, stations with specific information, e.g. on travelling for persons with reduced mobility, can be recorded and published in a [web map](https://maps2.trafimage.ch/ch.sbb.handicap). New is the function to map additional information on transport networks. For the spatial location of the information, the line number, start and end kilometres of the respective segment are stored. Saving the kilometre information ensures that the information is available in all generalisation levels and also after a change in the route.

![](/images/blog/cartaro_02.png)

The new kilometre function is used by SBB, for example, to manage responsibilities for line segments and to display them in the [Web map "Coordinators Railway-related Construction"](https://maps.trafimage.ch/#/ch.sbb.regionenkarte.public).

Integration of our routing service

Our routing service supports a wide range of movement modes. Especially for public transport vehicles we deliver better results than any other service. In order to be able to enrich route histories with topic-specific information as well, we have linked Cartaro with our routing service. Now you can define start, via and end stations in the input form, select the means of transport and then enter information on the route created in this way. The web map we developed for direct SBB connections in the day and night network will be published soon. We will inform you in the blog and our other channels as soon as you can find the next night train to your holiday on the web map.


## And more



With every new theme we integrate into Cartaro, the number of widgets, filters and other functions available also grows. Cartaro has widgets for date field entry, file upload, a coordinate picker and many more. We have also further developed the list view of Cartaro. It can now handle any number of entries and has filters and multiple editing options. A list of all functions and the various interfaces of Cartaro can be found on the solution page.

