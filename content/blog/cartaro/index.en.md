---
title: New Features in the GeoCMS Cartaro
summary: With our online tool Cartaro, spatial information can be conveniently
  managed and published in a web map at the push of a button.
cover: /images/blog/new-features-in-the-geocms-cartaro/cartaro_blog.png
created: 2021-07-28
slug: cartaro
tags:
  - cartaro
  - maps
frontpage: true
published: false
---
<!--StartFragment-->

Spatial reference of data is at the center of our Content Management System (CMS), which is why we also refer to Cartaro as "GeoCMS". Recently we have added lots of new featrues to Cartaro. This blog post gives an overview of the most important ones. Before that, the main features of Cartaro are briefly summarized.

## A short Profile

The core function of Cartaro is the automatic generation of data entry forms based on database tables. Based on the data model, Cararo automatically generates a [JSON schema](https://json-schema.org/), which is subsequently "translated" into a form by the client. Standard fields, such as checkboxes, input fields and drop-downs, can be easily replaced by one of the numerous Cartaro widgets, e.g. for image upload, by overwriting the schema. Additional widgets for any data format can be flexibly integrated into Cartaro and the fields nested for the sake of clarity. Geometry editing is done via the map view. Thanks to the integrated [OpenLayers Editor](https://openlayers-editor.geops.de/), any geometries can be created, edited and aligned with snapping tools.

<!--EndFragment-->

![](/images/blog/neue-funktionen-im-geocms-cartaro/cartaro_560.jpg "Natürlich kann Cartaro auch mit komplexen Datenmodellen umgehen und die Inhalte verknüpfter Tabellen entweder inline oder in separaten Formularen bearbeitbar machen. Das folgende Kapitel zeigt zudem, wie wir unser GeoCMS einsetzen, um Informationen aus unserer Datendrehscheibe mit Zusatzinformationen anzureichern.")

<!--StartFragment-->

## Additional Data for any Objects

In Cartaro, new geographic features can be created, edited and provided with thematic attributes. Also existing objects with known geometry can be enriched with additional information. For this purpose, we have connected Cartaro to our [data hub](https://geops.ch/solution/transit-data-hub), where we keep, among other things, worldwide station data and traffic networks in different levels of generalization. Stations with specific information, e.g. on travel for persons with reduced mobility, can be recorded and published in a [web map](https://maps.trafimage.ch/ch.sbb.handicap). New is the function to map additional information on transport networks based on linear reference. For locating the information, line number, start and end kilometers of the respective segment are stored. Linear referencing ensures that the information is available in all generalization levels and also after a change of the line course.

<!--EndFragment-->

![](/images/blog/new-features-in-the-geocms-cartaro/cartaro_03.jpg)

SBB as an example uses the new linear referencing function to map the [contact persons for construction work near railways](https://maps.trafimage.ch/ch.sbb.regionenkarte.public).

## Integration of our Routing Service

Our routing service supports various means of transportation. Especially for public transport vehicles, we deliver better results than any other service. In order to be able to enrich route trajectories with topic-specific information as well, we have linked Cartaro with the routing service. Now it is possible to define start, intermediate and end stations in the input form, select the means of transport and then enter information about the route created in this way. The web map we developed for direct SBB connections in the day and night network will be published soon. We will inform you in the blog and our other channels as soon as you can find the next night train to your vacation in the web map.

## And even more

With each new theme we integrate into Cartaro, the number of available widgets, filters and other features also grows. Cartaro has widgets for date field entry, file upload, a coordinate picker, and many more. We have also enhanced Cartaro's list view. It can now handle any number of entries and has filters and multiple editing capabilities. A list of all functions and the various interfaces of Cartaro can be found on the [solution page](https://geops.ch/solution).

<!--EndFragment-->