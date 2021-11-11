---
title: GeoServer WFS Performance Vergleich
summary: Für Cartaro und diverse Kundenprojekte ist der GeoServer eine zentrale
  Komponente. Daher wollten wir wissen, unter welchen Bedingungen der GeoServer
  die beste Geschwindigkeit bei der Auslieferung von Daten über das
  WFS-Protokoll (Web Feature Service) liefert.
slug: geoserver-wfs-performance-vergleich
---
Das WFS-Protokoll ermöglicht den Zugriff auf geografische Features über das Internet. Für die Kodierung der Geodaten wird standardmäßig die [Geography Markup Language (GML)](http://www.opengeospatial.org/standards/gml) verwendet, ein von der OGC spezifiziertes XML-Schema. Je nach Version des WFS-Protokolls werden auch unterschiedliche Versionen von GML verwendet. Zusätzlich stellt der GeoServer das [GeoJSON](http://www.geojson.org) -Format als kompaktes, alternatives Format mit JSON-Notation zur Verfügung. Für uns stellte sich die Frage, welche der beiden Formate die bessere Gesamtgeschwindigkeit liefert und wie groß der Unterschied ist. Uns interessierte auch, wie groß der Unterschied zwischen den beiden GML-Versionen 2.0 und 3.2 ist. Als Ergebnis erwarteten wir aufgrund der kleineren Dateigröße einen kleinen Vorteil für GeoJSON im Vergleich zu GML und einen Vorteil von GML 2.0 im Vergleich zu GML 3.2

**Testablauf**

Der Vergleich der Geschwindigkeit fand anhand der Parameter _durchschnittliche Anzahl Antworten pro Sekunde_ (avg requests/s) und _durchschnittliche Antwortzeit in Milisekunden_ (avg response time/req) statt.

Als Datengrundlage kommen die OpenStreetMap Daten der Schweiz zum Einsatz. Diese wurden in eine PostgreSQL (Version 9.1) / PostGIS (Version 2.0)  Datenbank importiert. Die Datenbank wurde als Datenquelle zu einer Installation von GeoServer (Version 2.3.3 / Tomcat6 / OpenJDK) hinzugefügt. Es wurden zwei exemplarische Layer mit unterschiedlichen Geometrietypen angelegt, auf deren Basis die Tests durchgeführt werden. Der erste Layer ist _osm\_mainroads_, der primär Linien enthält. Als zweiter Layer kommt _osm\_places_ zum Einsatz, der hauptsächlich Punktgeometrien enthält. PostgreSQL und GeoServer wurden gemeinsam auf einem Server (Debian Squeeze) mit 4GB RAM und 8 CPU-Kernen installiert.

Auf einem physisch getrennten Server (Ethernet Gigabit Link) wurde ein Belastungstest mit Apache JMeter ausgeführt. Es wurden pro Durchlauf nacheinander 4, 8, 16 und 32 parallele Zugriffe gestartet. In jedem Durchlauf wurde eine Kombination aus Ausgabeformat mit einem WFS-Layer verglichen. Um zufällige Testergebnisse und Ausreißer zu entdecken, wurde jeder Durchlauf dreimal ausgeführt. Als Endergebnis wurde der Mittelwert aus den drei Tests gebildet. Jeder Zugriff wurde mit folgenden Parametern durchgeführt:

```
ows?service=WFS&version=2.0.0&request=GetFeature&typeName={typename}&count=200&srsName=EPSG:4326&outputFormat={formatname}
```

**Resultate für osm\_mainroads**

<table border="1">
   <tbody>
      <tr>
         <th>Format</th>
         <th>4 Zugriffe</th>
         <th>8 Zugriffe</th>
         <th>16 Zugriffe</th>
         <th>32 Zugriffe</th>
         <th>Dateigröße</th>
      </tr>
      <tr>
         <td>GML3.2</td>
         <td>24,2 req/s<br>140 ms</td>
         <td>40 req/s<br>160 ms</td>
         <td>43 req/s<br>337 ms</td>
         <td>43 req/s<br>700 ms</td>
         <td>230 KB</td>
      </tr>
      <tr>
         <td>GML2</td>
         <td>83 req/s<br>30 ms</td>
         <td>124 req/s<br>30 ms</td>
         <td>197 req/s<br>45 ms</td>
         <td>230 req/s<br>100 ms</td>
         <td>150 KB</td>
      </tr>
      <tr>
         <td>GeoJSON</td>
         <td>81,5 req/s<br>33 ms</td>
         <td>110 req/s<br>37 ms</td>
         <td>160 req/s<br>62 ms</td>
         <td>180 req/s<br>142 ms</td>
         <td>150 KB</td>
      </tr>
   </tbody>
</table>

**Resultate für osm\_places**

<table border="1">
   <tbody>
      <tr>
         <th>Format</th>
         <th>4 Zugriffe</th>
         <th>8 Zugriffe</th>
         <th>16 Zugriffe</th>
         <th>32 Zugriffe</th>
         <th>Dateigröße</th>
      </tr>
      <tr>
         <td>GML3.2</td>
         <td>30 req/s<br>110 ms</td>
         <td>51 req/s<br>112 ms</td>
         <td>53 req/s<br>260 ms</td>
         <td>55 req/s<br>510 ms</td>
         <td>100 KB</td>
      </tr>
      <tr>
         <td>GML2</td>
         <td>120 req/s<br>17 ms</td>
         <td>140 req/s<br>17 ms</td>
         <td>200 req/s<br>44 ms</td>
         <td>240 req/s<br>75 ms</td>
         <td>70 KB</td>
      </tr>
      <tr>
         <td>GeoJSON</td>
         <td>117 req/s<br>17 ms</td>
         <td>153 req/s<br>18 ms</td>
         <td>265 req/s<br>25 ms</td>
         <td>310 req/s<br>66 ms</td>
         <td>40 KB</td>
      </tr>
   </tbody>
</table>

Die Ergebnisse zeigen deutlich, dass GML 3.2 im Vergleich zu GML 2.0 und GeoJSON massiv langsamer ist. Geschwindigkeitsunterschiede zwischen GML 2 und GML 3.2 waren aufgrund der [besseren Effizienz des XML-Encodings](http://osgeo-org.1560.n6.nabble.com/WFS-1-0-WFS-1-1-and-WFS-2-0-performance-issue-td5034498.html) in GeoServer zu erwarten, allerdings ist die Differenz dennoch überraschend groß. Besonders die durchschnittliche Antwortzeit pro Anfrage wird bei mehr als acht parallelen Zugriffen inakzeptabel langsam. Der Vergleich zwischen GML 2.0 und GeoJSON zeigt den großen Einfluss der auszulieferenden Daten und der Dateigröße auf die Gesamtgeschwindigkeit. Für den komplexeren Datensatz _osm\_mainroads_ ergibt sich für GML 2.0 und GeoJSON die gleiche Dateigröße und ein Geschwindigkeitsvorteil für GML 2.0. Für den Datensatz _osm\_places_ hat GeoJSON eine kleinere Dateigröße als GML 2.0 und kann dies zu einem Geschwindigkeitsvorteil nutzen. Es zeigt sich, dass keines von beiden Formaten immer besser ist, jedoch die Differenz zwischen GeoJSON und GML 2.0 nicht sehr groß ist.

Wenn die Geschwindigkeit ein wichtiges Thema ist, dann sollte die Verwendung von GML 3.2 nach Möglichkeit zur Zeit vermieden werden. Mit dem Einsatz von GML 2.0 und GeoJSON kann man wenig falsch machen. Wenn man die Wahl zwischen GML 2.0 und GeoJSON hat, kann es sich also lohnen einen Vergleich durchzuführen.

PS: Falls Sie bei uns mit GeoServer und weiterer Open Source Software arbeiten wollen, lesen Sie bitte unsere [aktuellen Stellenausschreibungen.](https://www.geops.de/jobs). Wir suchen Verstärkung!