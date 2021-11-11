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

**Testing procedure**

Comparison of speed was based on the parameters *average number of requests per second* (req/s) and *average response time in milliseconds* (ms).

OpenStreetMap data for Switzerland, imported into a PostgreSQL (version 9.1) / PostGIS (Version 2.0) database, were used as data source. The database was added as store to GeoServer (version 2.3.3 / Tomcat6 / OpenJDK). Two example layers with different geometry types were created and used for the test. The first layer, *osm_mainroads* consists mainly of lines, the second, *osm_places* mainly of points. PostgreSQL and GeoServer were installed on the same server (Debian Squeeze) with 4GB RAM and 8 cpu cores.

A load test with Apache JMeter was executed on a physically separated server, connected with a gigabit link. Within separate runs, 4, 8, 16 and 32 concurrent requests were performed.

Each run was executed three times to avoid random results and to detect spikes. The final result is the mean value of all three runs. Every request was performed with this parameters:

```
ows?service=WFS&version=2.0.0&request=GetFeature&typeName={typename}&count=200&srsName=EPSG:4326&outputFormat={formatname}
```

**Results for osm_mainroads**

<table>
   <tbody>
      <tr>
         <th>Format</th>
         <th>4 Requests</th>
         <th>8 Requests</th>
         <th>16 Requests</th>
         <th>32 Requests</th>
         <th>File size</th>
      </tr>
      <tr>
         <td>GML3.2</td>
         <td>24,2 req/s <br> 140 ms</td>
         <td>40 req/s <br> 160 ms</td>
         <td>43 req/s <br> 337 ms</td>
         <td>43 req/s <br> 700 ms</td>
         <td>230 KB</td>
      </tr>
      <tr>
         <td>GML2</td>
         <td>83 req/s <br> 30 ms</td>
         <td>124 req/s <br> 30 ms</td>
         <td>197 req/s <br> 45 ms</td>
         <td>230 req/s <br> 100 ms</td>
         <td>150 KB</td>
      </tr>
      <tr>
         <td>GeoJSON</td>
         <td>81,5 req/s <br> 33 ms</td>
         <td>110 req/s <br> 37 ms</td>
         <td>160 req/s <br> 62 ms</td>
         <td>180 req/s <br> 142 ms</td>
         <td>150 KB</td>
      </tr>
   </tbody>
</table>

**Results for osm_places**

<table>
   <tbody>
      <tr>
         <th>Format</th>
         <th>4 Requests</th>
         <th>8 Requests</th>
         <th>16 Requests</th>
         <th>32 Requests</th>
         <th>File size</th>
      </tr>
      <tr>
         <td>GML3.2</td>
         <td>30 req/s <br> 110 ms</td>
         <td>51 req/s <br> 112 ms</td>
         <td>53 req/s <br> 260 ms</td>
         <td>55 req/s <br> 510 ms</td>
         <td>100 KB</td>
      </tr>
      <tr>
         <td>GML2</td>
         <td>120 req/s <br> 17 ms</td>
         <td>140 req/s <br> 17 ms</td>
         <td>200 req/s <br> 44 ms</td>
         <td>240 req/s <br> 75 ms</td>
         <td>70 KB</td>
      </tr>
      <tr>
         <td>GeoJSON</td>
         <td>117 req/s <br> 17 ms</td>
         <td>153 req/s <br> 18 ms</td>
         <td>265 req/s <br> 25 ms</td>
         <td>310 req/s <br> 66 ms</td>
         <td>40 KB</td>
      </tr>
   </tbody>
</table>

The results show clearly how much slower GML 3.2 is compared to GML 2.0 and GeoJSON. While we expected GML 2.0 to perform slightly better that GML 3.2 due to [more efficient XML encodings](http://osgeo-org.1560.n6.nabble.com/WFS-1-0-WFS-1-1-and-WFS-2-0-performance-issue-td5034498.html) the size of the difference is surprising. Especially average response time per request becomes unacceptably high with more than eight concurrent requests. Comparison between GML 2.0 and GeoJSON demonstrates the high impact of the data set and the file size on performance. The more complex dataset  *osm_mainroads* leads to same file size for GML 2.0 and GeoJSON and to a performance benefit for GML. On the other hand, the data set *osm_places* leads to a smaller file size and a performance benefit for GeoJSON. As result, none of both is better in every case. The difference between GML 2.0 and GeoJSON is however not that big.

If performance is important, the use of GML 3.2 is not advisable. The use of GML 2.0 and GeoJSON seems quite uncritical. If there is the choice between GML 2.0 and GeoJSON, a dedicated comparison should be done to select the faster file format.

**BTW: If you would like working with us on GeoServer and other fantastic OS GIS software, please check our [current job postings](https://www.geops.de/jobs). We are hiring!**