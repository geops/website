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

`ows?service=WFS&version=2.0.0&request=GetFeature&typeName={typename}&count=200&srsName=EPSG:4326&outputFormat={formatname}`

**Resultate für osm\_mainroads**

Format

4 Zugriffe

8 Zugriffe

16 Zugriffe

32 Zugriffe

Dateigröße

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

**Resultate für osm\_places**

Format

4 Zugriffe

8 Zugriffe

16 Zugriffe

32 Zugriffe

Dateigröße

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

Die Ergebnisse zeigen deutlich, dass GML 3.2 im Vergleich zu GML 2.0 und GeoJSON massiv langsamer ist. Geschwindigkeitsunterschiede zwischen GML 2 und GML 3.2 waren aufgrund der [besseren Effizienz des XML-Encodings](http://osgeo-org.1560.n6.nabble.com/WFS-1-0-WFS-1-1-and-WFS-2-0-performance-issue-td5034498.html) in GeoServer zu erwarten, allerdings ist die Differenz dennoch überraschend groß. Besonders die durchschnittliche Antwortzeit pro Anfrage wird bei mehr als acht parallelen Zugriffen inakzeptabel langsam. Der Vergleich zwischen GML 2.0 und GeoJSON zeigt den großen Einfluss der auszulieferenden Daten und der Dateigröße auf die Gesamtgeschwindigkeit. Für den komplexeren Datensatz _osm\_mainroads_ ergibt sich für GML 2.0 und GeoJSON die gleiche Dateigröße und ein Geschwindigkeitsvorteil für GML 2.0. Für den Datensatz _osm\_places_ hat GeoJSON eine kleinere Dateigröße als GML 2.0 und kann dies zu einem Geschwindigkeitsvorteil nutzen. Es zeigt sich, dass keines von beiden Formaten immer besser ist, jedoch die Differenz zwischen GeoJSON und GML 2.0 nicht sehr groß ist.

Wenn die Geschwindigkeit ein wichtiges Thema ist, dann sollte die Verwendung von GML 3.2 nach Möglichkeit zur Zeit vermieden werden. Mit dem Einsatz von GML 2.0 und GeoJSON kann man wenig falsch machen. Wenn man die Wahl zwischen GML 2.0 und GeoJSON hat, kann es sich also lohnen einen Vergleich durchzuführen.

PS: Falls Sie bei uns mit GeoServer und weiterer Open Source Software arbeiten wollen, lesen Sie bitte unsere [aktuellen Stellenausschreibungen.](https://www.geops.de/jobs). Wir suchen Verstärkung!