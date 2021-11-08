---
title: Segmentierung von Linien in PostGIS
summary: ""
slug: segmentierung-von-linien-in-postgis
---
![Segmentierung von Linien (LineString) in PostGIS](/images/blog/segmentierung-von-linien-in-postgis/segmentierung_0.png)

Für die Verarbeitung von linearen Geometrien kann es notwendig sein, dass diese zerteilt werden. Vorstellbar wäre die teilweise Übertragung zu einem anderen System im Rahmen von Vektordatenrendering oder die Analyse von Segmenten (Kurvenradien).

Lange Streckenzüge wie Küstenlinen, Bahngleise oder Straßen liegen oft in einer Datenbank für Geodaten vor und sollten auch direkt dort segmentiert werden. Postgres in Kombination mit [PostGIS](http://postgis.refractions.net/) ist eine solche Datenbank, die aber leider keine Implementierung zur Segmentierung in fixe Längen mitbringt.

Wir gehen im Folgenden davon aus, dass ein Streckenzug in Segmente gleicher Länge zerteilt werden soll. Grundlage der Implementierung sind die Funktionen [ST\_Line\_Substring](http://postgis.refractions.net/docs/ST_Line_Substring.html) (Segmentierung in Anteile der Gesamtlänge) und [ST\_Length](http://postgis.refractions.net/docs/ST_Length.html) (Ermittlung der Gesamtlänge) für die Verarbeitung von Linen. Problematisch ist hierbei, dass für beliebige Linien weder die Anzahl der Segmente noch die Länge des Endstücks bekannt ist. Beispielsweise entstehen bei der Segmentierung einer 117m langen Strecke in 10m Segmente insgesamt 12 Segmente, davon eins mit einer Länge von nur 7m.

Die nachstehende Funktion zerteilt eine Line in Segement der gegebenen Länge. Die Angabe der Länge erfolgt dabei in den Einheiten des [Referenzsystems der Geometrie](http://www.sharpgis.net/post/2007/05/Spatial-references2c-coordinate-systems2c-projections2c-datums2c-ellipsoids-e28093-confusing.aspx), also in vielen Referenzsystemen in Metern.

```sql
CREATE OR REPLACE FUNCTION split_equal_length(p_geom geometry, p_target_length numeric)  
  RETURNS SETOF geometry AS  
$BODY$  
begin  
    return query select st_line_substring(p_geom, segment_start_fraction, segment_end_fraction)  
    from (  
        select (segment_number-1)\*ordinary_segment_length as segment_start_fraction, case when is_last then 1 else segment_number\*ordinary_segment_length end as segment_end_fraction  
        from (  
            select *, case when last_segment_number=1 then target_length else last_segment_start_fraction/(last_segment_number-1) end as ordinary_segment_length  
            from (  
                select *, is_last and (total_length%target_length>0) as is_short, 1-((total_length-((last_segment_number-1)\*target_length))\*(1/total_length)) as last_segment_start_fraction  
                from (  
                    select *, segment_number=last_segment_number as is_last  
                    from (  
                        select *, generate_series(1, ceil(total_length/target_length)::integer) as segment_number,  
                            ceil(total_length/target_length)::integer as last_segment_number  
                        from (  
                            select st_length(p_geom)::numeric as total_length, p_target_length::numeric as target_length  
                        ) input_data  
                    ) test  
                ) test  
            ) test  
        ) split_parameters  
    ) split_parameters;  
END;  
$BODY$  
  LANGUAGE plpgsql IMMUTABLE STRICT  
  COST 100  
  ROWS 1000;
```