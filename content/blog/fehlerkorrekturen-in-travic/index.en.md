---
title: Fehlerkorrekturen in TRAVIC
summary: Seit TRAVIC vor 2 Jahren gestartet ist, erreichen uns regelmäßig
  Meldungen von netzkundigen Nutzern, die von der Realität abweichende
  Fahrtverläufe festgestellt haben. Wieso weichen Routen von der Realität ab?
  Und wie kann ich helfen, das Routing zu verbessern?
cover: /images/blog/fehlerkorrekturen-in-travic/edit_blog.png
created: 2016-01-29
slug: fehlerkorrekturen-in-travic
tags:
  - developers
  - routing
  - mobility
published: true
---

Seit TRAVIC vor 2 Jahren gestartet ist, erreichen uns regelmäßig Meldungen von netzkundigen Nutzern, die von der Realität abweichende Fahrtverläufe festgestellt haben. Für diesen Input sind wir sehr dankbar. Da es uns für die Routen an Referenzdaten mangelt, haben wir fast keine Möglichkeit, Zug- oder Busfahrten im Einzelnen zu prüfen. Oft wirken Fahrtverläufe zwar auf den ersten Blick korrekt (Züge nutzen einleuchtende Strecken, Straßenbahnen folgen ohne "Knicke" oder Wenden auf freier Strecke ihren Gleisen), weichen im Detail aber deutlich vom tatsächlichen Verlauf ab. In den meisten Fällen fehlt uns einfach die Kenntnis der lokalen Gegebenheiten, um diese Fehler zu erkennen. Vor allem bei Buslinien auf dem Land ist meistens nur für Ortskundige ersichtlich, ob ein Bus in TRAVIC die richtige Route nimmt oder ob er sich durch eine für den Verkehr gesperrte, enge Altstadtgasse pflügt.

### Wieso weichen Routen von der Realität ab?

Für die meisten eurpäischen Ländern liegen uns die Fahrplandaten nur so vor, wie sie dem Fahrgast präsentiert werden: als Liste von Ankunfts-/Abfahrtszeiten an den Bahnhöfen. Wir haben weder die Information, wo diese Routen genau geografisch verlaufen noch über welche "Wegpunkte" sie im Detail führen. Die einzigen geografischen Stützpunkte, über die wir verfügen, sind die planmäßig angefahrenen Stationen. Vor allem bei Zugfahrten, die sehr weite Strecken ohne Halt zurücklegen (z.B. Fernzügen) gleicht das Finden der korrekten Strecke einem Ratespiel und kann in Einzelfällen vom wirklichen Fahrtverlauf abweichen.

Ein Beispiel: Aktuell verkehren in TRAVIC viele ICEs zwischen Hannover und Hamburg über Nienburg und Rotenburg, obwohl sie eigentlich über Celle und Lüneburg fahren.

![](/images/blog/fehlerkorrekturen-in-travic/prob_celle.png)

### Wie kann ich helfen, das Routing zu verbessern?

Die Fahrtverläufe generieren wir einmalig zum Fahrplanwechsel für das ganze Jahr. Als Ausgangsdatensatz nutzen wir [OpenStreetMap](http://www.openstreetmap.org/). Das Gleis- und Straßennetz in Europa ist dort nahezu vollständig abgedeckt und bildet eine ideale Grundlage für TRAVIC.

Grundsätzlich nutzen wir einen Kürzester-Weg-Algorithmus um zwischen 2 aufeinanderfolgenden Stationen den geografischen Fahrtverlauf zu generieren (wie [hier](https://website.geops.de/blog/mapping-von-netzen-des-%C3%B6ffentlichen-verkehrs) beschrieben). Da im Bereich ÖV der kürzeste Weg zwischen zwei Stationen jedoch selten der tatsächlich Fahrtverlauf ist, nutzen wir neben Heuristiken (z.B. der Anzahl durchfahrener Stationen) auch OSM-Attribute, um die Menge der möglichen Wege zu verkleinern.

Es gibt mehrere Möglichkeiten, zur Verbesserung von TRAVIC beizutragen.

#### Durch Korrekturen in OSM

Eine große Zahl von Fehlern kann behoben werden, indem die zugrundeliegenden OSM-Daten entweder korrigiert oder angereichert werden. Dies umfasst beispielsweise das Hinzufügen von neuen OSM-Relationen oder die Korrektur von evt. falschen Weg-Attributen.

Die Bearbeitung von OSM-Daten ist mehr oder weniger unkompliziert mit verschiedenen Tools möglich. Am komfortabelsten und plattformunabhängigsten ist aktuell [iD](http://wiki.openstreetmap.org/wiki/ID).

Um den Editor zu starten, sollte man sich zunächst auf [www.openstreetmap.org](http://www.openstreetmap.org/) registrieren.

![](/images/blog/fehlerkorrekturen-in-travic/osm_overview.png)

Nach der Registrierung kann über den "Edit"-Button der Editor gestartet werden.

![](/images/blog/fehlerkorrekturen-in-travic/edit_button.png)

Nun muss man in den Bereich, den man bearbeiten möchte, hineinzoomen. In unserem Fall möchten wir die Relation für den ICE 22 bearbeiten. Der Kartenausschnitt sollte also z.B. um die Gegend bei Celle eingestellt werden, wo der ICE 22 auf seiner Fahrt von Hannover nach Hamburg verkehrt.

![](/images/blog/fehlerkorrekturen-in-travic/celle_overview.png)

Ein Klick auf das Gleis öffnet links die Bearbeitungsanzeige für die Attribute der eigentlichen Geometrie ("way") und listet außerdem die Relationen auf, zu der der Weg gehört. In OSM können verschiedene Objekte mittels Relationen zusammengefasst werden, so dass es z.B. möglich ist, bestimmte Zugstrecken, die aus hunderten Einzelgeometrien bestehen, zu einem Objekt zu gruppieren.

![](/images/blog/fehlerkorrekturen-in-travic/edit.png)

In diesen Fall ist schnell ersichtlich, weshalb die Routenfindung unserer Algorithmus nicht den korrekten Weg findet: die ICE-Relationen sind ohne Leerzeichen notiert (ICE25 statt ICE 25). Dies entspricht nicht der Benennung im Fahrplan und folgt außerdem nicht dem [Vorschlag in der OSM-Wiki](http://wiki.openstreetmap.org/wiki/Train_routes).

![](/images/blog/fehlerkorrekturen-in-travic/korrektur.png) Durch Anklicken der Relation kann sie bearbeitet und ein Leerzeichen eingefügt werden.

Danach synchronisiert ein Klick auf "Save" die Änderungen in die OSM-Datenbank. Beim nächsten Durchlauf unseres Routings sollten Fahrzeuge der ICE 22-Relation den korrekten Weg nehmen.

#### Durch Zuordnung von Fahrzeugtypen

Ein Problem ganz anderer Art stellt die Zuordnung von Fahrzeugtypen dar. Die Fahrplan-Rohdaten, mit denen wir TRAVIC speisen, kennen keine eindeutigen Fahrzeugtypen. Es ist uns also ohne manuelle Vorarbeit nicht möglich, zu sagen, ob ein Fahrzeug eine Fähre, ein Bus, eine U-Bahn oder ein Zug ist. Für das Finden der richtigen Route ist das jedoch sehr wichtig. Wenn wir z.B. den Fahrtverlauf für einen Bus suchen, blenden wir Geometrien von Zuggleisen völlig aus. Ist nun ein Zug fälschlicherweise als Bus markiert, kann die korrekte Route nicht mehr gefunden werden.

Ein relativ einfaches Beispiel ist unten zu sehen. ![](/images/blog/fehlerkorrekturen-in-travic/salzugburgs4.png) Die S4 bei Salzburg ist seit dem Fahrplanwechsel in den Fahplandaten ohne Leerzeichen geschrieben, daher wird beim internen Lookup des Fahrzeugtyps jetzt "Subway" statt korrekterweise "Zug" eingetragen. Das hat zur Folge, dass für die S-Bahn überhaupt keine Geometrie gefunden wird und direkte Luftlinienverbindungen als Fallback geschrieben werden.![](/images/blog/fehlerkorrekturen-in-travic/salzugburgs4_big.png)

Die meisten Fälle sind etwas tiefer verborgen als der oben gezeigte. Wenn solche Fälle erkannt werden, wäre uns mit einer Lookup-Tabelle vom Routennamen (in TRAVIC die kleingedruckte Bezeichnung direkt unter dem Fahrtziel) zum Fahrzeugtyp geholfen. Diese kann uns einfach per Mail zugesandt werden. Die von uns verwendete Fahrzeugtypen entsprechen dem GTFS-Standard und werden [hier aufgelistet](https://developers.google.com/transit/gtfs/reference#routestxt). Der Fahrzeug-Typ für Züge ist beispielsweise "2".

Eine mögliche Lookup-Tabelle könnte also so aussehen:

S1,2
S2,2
S3,2
S4,2
S5,2

#### Durch Mapping von Fahrzeugnamen

In einigen Fällen entsprechen die Routennamen die im Fahrplan (und damit in TRAVIC) erscheinen nicht den Routennamen, die dem Fahrgast am Bahnhof angezeigt werden und die auch in OSM vorhanden sind. Dies gilt insbesondere für Nebenbahnen, die nicht von der DB betrieben werden. Die Korrektur von Routennamen in OSM-Relationen bringt in solchen Fällen natürlich keine Verbesserungen. Auch sollte man auf keinen Fall Relationen in OSM eintragen, die auf den internen Bezeichnungen des Fahrplans beruhen.

Stattdessen wäre uns hier wieder mit einer Lookup-Tabelle geholfen, die die häufig kryptischen Bezeichnungen des Fahrplans in die gängigen Bezeichnungen vor Ort übersetzt.

Für den Raum Freiburg z.B. böte sich eine solche Lookup-Tabelle an (die Breisgau-S-Bahn wird dem Fahrgast als BSB präsentiert):

DPS 88353,BSB
DPS 88348,BSB

Auch diese kann uns einfach per Mail zugesandt werden.

### Fazit

Wer über Basiskenntnisse im Umgang mit OSM verfügt, kann viele der Abweichungen in TRAVIC selbst korrigieren. Natürlich muss einschränkend nochmals erwähnt werden, dass wir aufgrund der riesigen Menge an Daten die Fahrtverläufe nur einmal im Jahr zum Fahrplanwechsel generieren. Es kann also u.U. lange dauern, bis Korrekturen in OSM auch in TRAVIC erscheinen.

Zusätzlich sollte nicht unerwähnt bleiben, dass ein ebenfalls großer Anteil der Ungenauigkeiten im Routing seinen Ursprung in unserem Algorithmus hat. Vor allem das Nutzen zusätzlicher OSM-Attribute wie z.B. der Maximalgeschwindigkeit o.ä. ist noch nicht vollständig umgesetzt. Hier erwarten wir auf unseren Seite in den nächsten Monaten große Verbesserungen.
