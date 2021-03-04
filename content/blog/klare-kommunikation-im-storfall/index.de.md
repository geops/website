---
title: Klare Kommunikation im Störfall
summary: Die SBB rüstet derzeit 16 wichtige Bahnhöfe mit neuen Generalanzeigern
  aus. Diese beinhalten neben der bekannten Abfahrtsanzeige auch eine neuartige
  Anzeige für den Störungsfall. Für die Entwicklung dieses Moduls war geOps
  zuständig.
slug: klare-kommunikation-im-storfall
---
Die SBB rüstet derzeit 16 wichtige Bahnhöfe mit neuen Generalanzeigern aus. Diese beinhalten neben der bekannten Abfahrtsanzeige auch eine neuartige Anzeige für den Störungsfall. Für die Entwicklung dieses Moduls war geOps zuständig.

Die neuen Generalanzeiger der SBB basieren auf moderner LED-Technologie und lösen die mechanischen Faltblattanzeiger ab. Der Störungsanzeiger informiert die Kunden bei grösseren Einschränkungen im Bahnverkehr. Dabei werden die betroffenen Verbindungen, deren Ursache und Dauer nicht nur aufgelistet, sondern auch in einer dynamisch erzeugten Karte dargestellt. Die Karte zeigt dem Kunden den Ort der Störung, aber auch mögliche alternative Verbindungen. Im Normalbetrieb wird auf dem Störungsanzeiger Werbung geschaltet.

![](/images/blog/klare-kommunikation-im-storfall/moco_bern_web.jpg)

geOps war mit der Entwicklung der Software-Plattform des Störungsanzeigers beauftragt. Die Störungsinformationen können in einer einfach zu bedienenden Webanwendung zusammengestellt werden. Bei der Erfassung der entsprechenden Informationen wird auf bereits erfasste Daten der SBB zurückgegriffen. Somit lassen sich mit wenigen Mausklicks die wichtigsten Angaben wie Verbindung, betroffene Bahnhöfe oder voraussichtliche Dauer der Störung zusammenstellen. Diese Basisinformationen können laufend ergänzt und angepasst werden. Die Nutzung von Textbausteinen gewährleistet dabei die Einhaltung einer einheitlichen Sprache.

Eine besondere Herausforderung bei der Entwicklung war die Abbildung der Karten. Auf beliebigen Massstäben soll ein übersichtliches Kartenbild mit Hervorhebung des Linienverlaufs die exakte Lage der Störung vermitteln. Labels der relevanten Stationen sollen angezeigt werden, ohne dass es zu unerwünschten Überlagerungen mit anderen wichtigen Details kommen darf.

Für die Kartenbewirtschaftung steht daher ein spezieller webbasierter Karteneditor zur Verfügung. Er erlaubt das einfache Einzeichnen des Störungsverlaufs auf der Karte mit Hilfe einer Webanwendung. Stationsnamen können manuell ein- und ausgeblendet und wenn nötig in ihrer Position optimiert werden. Eine Vorschaufunktion erlaubt die Beurteilung vor Freischaltung. Die Störungsinformation kann zeitgesteuert auf den Displays ausgewählter Bahnhöfe freigeschaltet werden.

![](/images/blog/klare-kommunikation-im-storfall/mocomap.png)

Die Basis des Störungsanzeigesystems ist das [GeoCMS Cartaro](http://cartaro.org). Cartaro bietet viele Funktionen, die für den Aufbau von Webanwendung direkt übernommen werden können. Dazu gehören die kombinierte Erfassung von Texten und Geodaten in einer Datenbank, die granulare Benutzerverwaltung oder auch die Option für eine genaue Revisionsverfolgung aller Einträge. Ein grosser Vorteil von Cartaro ist zudem die modulare Ausbaufähigkeit des Systems. So wurde für den Störungsmonitor der gesamte Karteneditor von Grund auf neu entwickelt und integriert. Um die Routenfindung zwischen Stationen zu integrieren wurde eine eigenständige Software von geOps über Schnittstellen angebunden, die bereits in vielen anderen Projekten Anwendung gefunden hat.

> Der neue Generalanzeiger in Zürich HB ist Hammer, oder? [pic.twitter.com/ktijlrfbwA](https://t.co/ktijlrfbwA)
> 
> — Andreas Meyer (@AndreasMeyer) [October 20, 2015](https://twitter.com/AndreasMeyer/status/656434347185217536)

Der neue Störungsanzeiger wurde im Rahmen der [Trafimage-Systematik](http://www.trafimage.ch) der SBB realisiert. Unter dem Namen Trafimage publiziert die SBB Karten und Pläne des öffentlichen Verkehrs. Bildaufbau und Bildgestaltung von Trafimage sind ein fester Bestandteil des Auftritts der SBB. Die Trafimage-Produkte werden im Auftrag der SBB von geOps in enger Zusammenarbeit mit der Designagentur [evoq](http://www.evoq.ch) entwickelt und ausgebaut.

Technische Grundlagen:

*   GeoCMS Cartaro für das Datenmanagement
*   PostGIS und PostgreSQL als Datenbank
*   GeoServer und GeoWebCache für die Kartenerstellung
*   pgRouting für die Berechnung der Zugverläufe