---
title: GeoServer WFS Performance Comparison
summary: GeoServer is one main component for Cartaro and various customer
  projects. Therefore we wanted to know under which conditions GeoServer
  delivers the best WFS (Web Feature Service) performance.
created: 2013-02-20
slug: geoserver-wfs-performance-comparison
tags:
  - geops
  - developers
published: true
---

WFS enables the web access to geographical features. Per default, the [Geography Markup Language (GML)](http://www.opengeospatial.org/standards/gml), a XML schema specified by the OGC is used to encode the geodata. Depending on the version of WFS, different versions of GML are being used. Additionally, GeoServer provides [GeoJSON](http://www.geojson.org) as an alternative file format with JSON notation. We wanted to know, which of these file formats gives the best performance and how big the differences are. Furthermore, we were also interested in the difference between GML 2.0 and GML 3.2. We expected a slight advance for GeoJSON due to smaller file sizes and as well an advance for GML 2.0 compared to GML 3.2.

**Testing procedure  
**

Comparison of speed was based on the parameters _average number of requests per second_ (req/s) and _average response time in milliseconds_ (ms).

OpenStreetMap data for Switzerland, imported into a PostgreSQL (version 9.1) / PostGIS (Version 2.0) database, were used as data source. The database was added as store to GeoServer (version 2.3.3 / Tomcat6 / OpenJDK). Two example layers with different geometry types were created and used for the test. The first layer, _osm_mainroads_ consists mainly of lines, the second, _osm_places_ mainly of points. PostgreSQL and GeoServer were installed on the same server (Debian Squeeze) with 4GB RAM and 8 cpu cores.

A load test with Apache JMeter was executed on a physically separated server, connected with a gigabit link. Within separate runs, 4, 8, 16 and 32 concurrent requests were performed.

Each run was executed three times to avoid random results and to detect spikes. The final result is the mean value of all three runs. Every request was performed with this parameters:

`ows?service=WFS&version=2.0.0&request=GetFeature&typeName={typename}&count=200&srsName=EPSG:4326&outputFormat={formatname}`

**Results for osm_mainroads**

Format

4 Requests

8 Requests

16 Requests

32 Requests

File size

GML3.2

24,2 req/s  
140 ms

40 req/s  
160 ms

43 req/s  
337 ms

43 req/s  
700 ms

230 KB

GML2

83 req/s  
30 ms

124 req/s  
30 ms

197 req/s  
45 ms

230 req/s  
100 ms

150 KB

GeoJSON

81,5 req/s  
33 ms

110 req/s  
37 ms

160 req/s  
62 ms

180 req/s  
142 ms

150 KB

**Results for osm_places**

Format

4 Requests

8 Requests

16 Requests

32 Requests

File size

GML3.2

30 req/s  
110 ms

51 req/s  
112 ms

53 req/s  
260 ms

55 req/s  
510 ms

100 KB

GML2

120 req/s  
17 ms

140 req/s  
17 ms

200 req/s  
44 ms

240 req/s  
75 ms

70 KB

GeoJSON

117 req/s  
17 ms

153 req/s  
18 ms

265 req/s  
25 ms

310 req/s  
66 ms

40 KB

The results show clearly how much slower GML 3.2 is compared to GML 2.0 and GeoJSON. While we expected GML 2.0 to perform slightly better that GML 3.2 due to [more efficient XML encodings](http://osgeo-org.1560.n6.nabble.com/WFS-1-0-WFS-1-1-and-WFS-2-0-performance-issue-td5034498.html) the size of the difference is surprising. Especially average response time per request becomes unacceptably high with more than eight concurrent requests. Comparison between GML 2.0 and GeoJSON demonstrates the high impact of the data set and the file size on performance. The more complex dataset  _osm_mainroads_ leads to same file size for GML 2.0 and GeoJSON and to a performance benefit for GML. On the other hand, the data set _osm_places_ leads to a smaller file size and a performance benefit for GeoJSON. As result, none of both is better in every case. The difference between GML 2.0 and GeoJSON is however not that big.

If performance is important, the use of GML 3.2 is not advisable. The use of GML 2.0 and GeoJSON seems quite uncritical. If there is the choice between GML 2.0 and GeoJSON, a dedicated comparison should be done to select the faster file format.

**BTW: If you would like working with us on GeoServer and other fantastic OS GIS software, please check our [current job postings](https://www.geops.de/jobs). We are hiring!**
