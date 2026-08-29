---
title: State of the Map 2026
summary: In August 2026, geOps developers attended the State of the Map conference to connect with the OSM community and gain valuable insights into the latest developments and trends in the field.
cover: /images/blog/state-of-the-map-2026/sotm_2026.png
created: 2026-08-29
author: Daniel Marsh-Hunn
slug: state-of-the-map-2026
published: true
---

geOps prides itself on providing high-quality geospatial solutions and services using open-source technologies and industry best practices. It goes without saying that OpenStreetMap plays a crucial role in our work. In August 2026, geOps developers attended the State of the Map conference to connect with the OSM community and gain valuable insights into the latest developments and trends in the field.


It did not come as a surprise that one question was a particular focus: How do we obtain high-quality geodata for use in OSM and integrate it into the broader geospatial ecosystem? A key factor is making it easy and accessible for contributors to add and update data. In one of the keynote talks, [Panoramax](https://www.panoramax.fr), a new platform for collecting, sharing and accessing ground-level imagery, shared its vision and approach for simplifying the contribution process and ensuring high-quality data collection.

In a second block of talks, the focus shifted towards web map performance and vector tile optimization. This was particularly interesting to geOps because our maps rely on [MapLibre](https://maplibre.org/) and OSM tile standards such as OpenMapTiles and Shortbread. In a talk about the current state of MapLibre, founding member [Yuri Astrakhan](https://www.linkedin.com/in/yurik) presented the new MLT tile format, the MapLibre alternative to Mapbox MVT. Among other things, he explained how MLT's columnar encoding improves data compression and reduces the overall size of vector tiles, leading to faster map rendering and an improved user experience. While MapLibre does not yet fully support the format, geOps will keep a close eye on it and evaluate its potential benefits for our mapping infrastructure as it matures. In another session, Thunderforest founder Andy Allan explained the challenges of transitioning from the raster-tile version of their [transport map](https://www.thunderforest.com/maps/transport/) to a vector-tile-based approach. He also presented [GLUG](https://github.com/systemed/glug), an easy-to-use programming language for generating MapLibre map styles.

![](/images/blog/state-of-the-map-2026/sotm2.jpg)

Further talks included news and updates about different routing solutions based on OpenStreetMap data, including MOTIS, [Transitious](https://www.transitious.org/) and [OSRM](https://www.osrm.org/), as well as ensuring offline maps on trains and creating large quantities of printed proximity maps for bus stops.

In summary, State of the Map 2026 provided valuable insights into the latest developments and trends in the OpenStreetMap ecosystem. Perhaps geOps will present its own solutions and contributions to the community at the next conference.