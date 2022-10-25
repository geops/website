---
title: Test of our public transport routing
summary: Automatically and manually recorded routes of public transport - a comparison
  with data from the SBB and the ZVV.
cover: /images/blog/test-unseres-ov-routings/zvvsbb.PNG
created: 2015-10-05
slug: test-our-public-transport-routing
tags:
  - routing
published: true
---

Für die geographisch exakte Abbildung der Linienverläufe im öffentlichen Verkehr verwenden wir einen [Routing-Algorithmus](/blog/mapping-von-netzen-des-%C3%B6ffentlichen-verkehrs), der mit ausgefeilten Heuristiken für die öffentlichen Verkehrsmittel die wahrscheinlichste Verbindung zwischen der bekannten Lage von Stationen sucht. Wir haben immer wieder positives Feedback erhalten und Bestätigungen, dass die gefundenen Routen in den meisten Fällen der Realität entsprechen. Die kürzlich von der ZVV veröffentlichten [Fahrplandaten](http://fahrplanfelder.ch) enthalten neben den Verbindungen auch die Linienverläufe. Diese sind im GTFS-Format als shapes-Datei enthalten und werden vom ZVV mit beträchtlichem Aufwand manuell digitalisiert. Der neue Datensatz bietet eine interessante Vergleichsmöglichkeit zu Daten der SBB, die keine Linienverläufe enthalten, und auf die wir unser Routing angewendet haben.

Die folgende Karte zeigt oben den Datensatz der SBB und unten den des ZVV. Die Linien in der Karte oben sind automatisch berechnet, die unteren manuell erfasst. Klicken SIe auf einen Punkt in der Karte, um den Linienverlauf zu sehen. Zoomen und Verschieben zwischen den beiden Karten sind synchronisiert.

Der Vergleich der beiden Datensätze zeigt neben den Linienverläufen einige Unterschiede im Detail. So werden die Daten vom ZVV mit einer sekundengenauen Auflösung bereitgestellt. Wenn die SBB die Daten in ihr System übernimmt und wieder publiziert wird dagegen auf Minuten gerundet. In TRAVIC führen diese Unterschiede zu unterschiedlichen aktuellen Positionen der Fahrzeuge. Auch die Farben in beiden Datensätzen weichen voneinander ab. TRAVIC verwendet für die Farbdarstellung die Werte, die im GTFS enthalten sind, und da verwendet der ZVV seine eigenen Farben, während sie bei der SBB mit anderen Verbünden harmonisiert werden. Die Menge der sichtbaren Fahrzeuge weicht natürlich auch in beiden Datensätzen voneinander ab. In der unteren Karte sind nur die Fahrzeuge des ZVV enthalten, während oben auch die Fahrzeuge aller anderen Verkehrsunternehmen enthalten sind.

![](/images/blog/test-unseres-ov-routings/iceberlin.PNG)

Der Kartenvergleich stützt das Verfahren der automatisierten Linienfindung. Wir möchten aber auch nicht verschweigen, dass es in manchen Fällen zu gröberen Fehlern kommen kann. In der Regel entstehen diese Fehler, wenn das Netzwerk, auf dem die Routenfindung aufsetzt, fehlerhaft ist. Da wir meist OpenStreetMap-Daten als Grundlage verwenden, können solche Fehler durch die Community selbst behoben werden, indem die Daten in OpenStreetMap korrigiert werden. Manche anderen Fehler entstehen aber auch, da unsere Heuristiken noch nicht alle Gegebenheiten berücksichtigen. Der Kartenausschnitt oben zeigt eine Kombination beider Fehlerquellen. Dass der ICE im Hauptbahnhof Berlin vom oberen Stockwerk ins Erdgeschoss fährt liegt zuerst einmal an einem falsch gesetzten Netzwerkknoten in OpenStreetMap. Andererseits sollten wir unsere Heuristik so erweitern, dass ICEs keine Treppen steigen und keine 90°-Wendungen vollziehen dürfen. Wir arbeiten laufend an Verbesserungen.
