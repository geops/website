---
title: Reporting mit Jaspersoft
summary: Jaspersoft wird als Reportingtool in unseren Anwendungen eingesetzt.
created: 2023-02-09
slug: jaspersoft
published: true
---
Daten bestmöglich und in erster Linie benutzerfreundlich zu präsentieren, ist ein wichtiger Anspruch an unsere Produkte. Oft ist es zusätzlich notwendig die Daten in einer bestimmten Weise zu exportieren, für Bilanzen, Statistiken oder andere zusammenfassende Berichte. Altlast4Web bot schon von Anfang an die Möglichkeit, die umfassenden Daten zu belasteten Standorten in einem vorgegebenen Layout generalisiert in Dokumenten mit unterschiedlichen Export-Formaten wiederzugeben. Nicht nur um die Kundenanforderungen abzudecken, sondern auch um noch mehr Flexibilität bei der Darstellung zu erreichen, setzen wir seit letzem Jahr [TIBCO Jaspersoft](https://www.jaspersoft.com/) ein.

Mit Jaspersoft lassen sich Reports auf den Pixel genau formatieren, fliessende Seitenübergänge oder Lücken bei leeren Datengrundlage stellen kein Problem mehr da. Die Handhabung ist einfach und benötigt keine Programmierkenntnisse. Wer lieber im Code designed, kann die XML Datei direkt anpassen.  Mit [TIBCO Jaspersoft Studio](https://sourceforge.net/projects/jasperstudio/) lassen sich Reports über die benutzerfreundliche GUI direkt in der Dokumentenansicht oder im Source Code schnell und einfach generieren.

![Links Design Ansicht in Jaspersoft Studio, rechts der finale Export mit Testdaten aus unserer Altlast4Web Demo Anwendung.](/images/blog/reporting-with-jaspersoft/screenshot-from-2023-02-09-16-23-12.png)

## Kartenintegration über URL-Link

Für unsere Anforderungen war die Karteneinbindung über einen URL-Link bislang die geeigneteste Lösung. Mapserver und entsprechende Dienste waren bereits eingerichtet. Extent und andere Parameter konnten spezifisch konfiguriert werden.

Im xml-Code sieht die Einbindung folgendermaßen aus:

```
<image>
	<reportElement mode="Transparent" x="60" y="60" width="440" height="440" uuid="7722cce9-ad6f-40aa-ad99-a92b01485c17">
	</reportElement>
	<imageExpression><![CDATA[$F{kbs_url}]]></imageExpression>
</image>
```

Beispiel $F{kbs_url} : https://\[my server]/cgi-bin/altlast4web.wms?&LAYERS=KBS&SRS=EPSG%3A2056&FORMAT=image%2Fpng&USER=18&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&TRANSPARENT=TRUE&VFLZ=7022122&BBOX=2635694.8198570926,1245879.5853543915,2636544.8198570926,1246607.5853543915&WIDTH=1000&HEIGHT=1000

Prinzipiell ist es möglich, auch einfach zwei Bilder übereinanderzulegen:

```
<image>
	<reportElement mode="Transparent" x="60" y="60" width="440" height="440" uuid="7722cce9-ad6f-40aa-ad99-a92b01485c17">
	</reportElement>
	<imageExpression><![CDATA[$F{kbs_url}]]></imageExpression>
</image>
<image>
	<reportElement mode="Transparent" x="60" y="60" width="440" height="440" uuid="77a3c12b-aea9-41b3-9c06-081f4ba70fd5"/>
	<imageExpression><![CDATA[$F{background_url}]]></imageExpression>
</image>
```

Allerdings wird diese Einstellung nicht korrekt im Word-Export übernommen, weshalb wir dazu raten sich auf eine URL zu begrenzen. Wir konnten dieses Problem ganz einfach über unseren Mapserver lösen, indem wir den externen Kartendienst in unseren eingebunden haben. Damit bleibt es eine URL mit mehreren Layern die angefragt werden: https://\[my server]/cgi-bin/altlast4web.wms?&LAYERS=ch_swisstopo_swissimage,KBS&SRS=EPSG%3A2056&FORMAT=image%2Fpng&USER=18&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&TRANSPARENT=TRUE&VFLZ=7022122&BBOX=2635694.8198570926,1245879.5853543915,2636544.8198570926,1246607.5853543915&WIDTH=1000&HEIGHT=1000

## Integration der Reports in unsere Anwendungen

Wir nutzen [TIBCO JasperReports Server](https://community.jaspersoft.com/project/jasperreports-server) innerhalb eines Docker-Containers, um die Reportdateien (.jrxml) in unsere Anwendungen einzubinden. Über die Benutzeroberfläche von Jasper Server lässt sich die Datenbankverbindung und die Reports, samt eventueller Reportparameter konfigurieren. Unsere Anwendungen greifen per URL-Aufruf auf die einzelnen Reports zu.

Jasper Server lässt sich nicht zuletzt auch wegen der schnellen Konfigurierung mit eigenem Corporate Design in einer css-Datei bestmöglich in unsere Anwendungen einbetten.

![Jasper Studio Ansicht mit den hinterlegten Reports und dem Corporate Design von geOps.](/images/blog/reporting-with-jaspersoft/screenshot-from-2023-02-09-16-41-13.png)

## Fazit

Die Reportgenerierung mit Jaspersoft bietet viele Möglichkeiten. Nach dem Einstieg sind Reports einfach zu Strukturieren. Vor allem die codebasierte Bearbeitung in Kombination mit Vorschau-Option vereinfacht das Entwickeln. Jedoch kommt es vor, dass man hin und wieder an ungenauen Fehlermeldungen hängen bleibt. Jasper Server liefert meist nicht lesbare Error-IDs, obwohl die genaue Meldung in den Server Logs zu finden ist.

Insgesamt sind wir beeindruckt, wie schnell Anpassungen an den Reports direkt publiziert werden können. Jaspersoft wird uns zukünftig noch in weiteren Anwendungen unterstützen und wir freuen uns darauf, weitere bisher ungenutzte Features und Möglichkeiten der Reportgenerierung auszuschöpfen.