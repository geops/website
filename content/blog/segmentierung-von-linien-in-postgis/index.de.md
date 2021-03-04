---
title: Segmentierung von Linien in PostGIS
summary: ""
slug: segmentierung-von-linien-in-postgis
---
![Segmentierung von Linien (LineString) in PostGIS](/images/blog/segmentierung-von-linien-in-postgis/segmentierung_0.png)Für die Verarbeitung von linearen Geometrien kann es notwendig sein, dass diese zerteilt werden. Vorstellbar wäre die teilweise Übertragung zu einem anderen System im Rahmen von Vektordatenrendering oder die Analyse von Segmenten (Kurvenradien).

Lange Streckenzüge wie Küstenlinen, Bahngleise oder Straßen liegen oft in einer Datenbank für Geodaten vor und sollten auch direkt dort segmentiert werden. Postgres in Kombination mit [PostGIS](http://postgis.refractions.net/) ist eine solche Datenbank, die aber leider keine Implementierung zur Segmentierung in fixe Längen mitbringt.

Wir gehen im Folgenden davon aus, dass ein Streckenzug in Segmente gleicher Länge zerteilt werden soll. Grundlage der Implementierung sind die Funktionen [ST\_Line\_Substring](http://postgis.refractions.net/docs/ST_Line_Substring.html) (Segmentierung in Anteile der Gesamtlänge) und [ST\_Length](http://postgis.refractions.net/docs/ST_Length.html) (Ermittlung der Gesamtlänge) für die Verarbeitung von Linen. Problematisch ist hierbei, dass für beliebige Linien weder die Anzahl der Segmente noch die Länge des Endstücks bekannt ist. Beispielsweise entstehen bei der Segmentierung einer 117m langen Strecke in 10m Segmente insgesamt 12 Segmente, davon eins mit einer Länge von nur 7m.

Die nachstehende Funktion zerteilt eine Line in Segement der gegebenen Länge. Die Angabe der Länge erfolgt dabei in den Einheiten des [Referenzsystems der Geometrie](http://www.sharpgis.net/post/2007/05/Spatial-references2c-coordinate-systems2c-projections2c-datums2c-ellipsoids-e28093-confusing.aspx), also in vielen Referenzsystemen in Metern.

CREATE OR REPLACE FUNCTION split\_equal\_length(p\_geom geometry, p\_target\_length numeric)  
  RETURNS SETOF geometry AS  
$BODY$  
begin  
    return query select st\_line\_substring(p\_geom, segment\_start\_fraction, segment\_end\_fraction)  
    from (  
        select (segment\_number-1)\*ordinary\_segment\_length as segment\_start\_fraction, case when is\_last then 1 else segment\_number\*ordinary\_segment\_length end as segment\_end\_fraction  
        from (  
            select \*, case when last\_segment\_number=1 then target\_length else last\_segment\_start\_fraction/(last\_segment\_number-1) end as ordinary\_segment\_length  
            from (  
                select \*, is\_last and (total\_length%target\_length>0) as is\_short, 1-((total\_length-((last\_segment\_number-1)\*target\_length))\*(1/total\_length)) as last\_segment\_start\_fraction  
                from (  
                    select \*, segment\_number=last\_segment\_number as is\_last  
                    from (  
                        select \*, generate\_series(1, ceil(total\_length/target\_length)::integer) as segment\_number,  
                            ceil(total\_length/target\_length)::integer as last\_segment\_number  
                        from (  
                            select st\_length(p\_geom)::numeric as total\_length, p\_target\_length::numeric as target\_length  
                        ) input\_data  
                    ) test  
                ) test  
            ) test  
        ) split\_parameters  
    ) split\_parameters;  
END;  
$BODY$  
  LANGUAGE plpgsql IMMUTABLE STRICT  
  COST 100  
  ROWS 1000;