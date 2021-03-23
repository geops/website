---
title: Livemap
summary: LiveMaps zeigen die Positionen von Fahrzeugen des öffentlichen Verkehrs
  auf einer Karte. Neben der Kartendarstellung entstehen mit der Verarbeitung
  der Fahrzeugpositionen präzise Prognosen für Reisende.
slug: tralis-livemap
contactSubtitle: >-
  Unsere LiveMaps können für Visualisierung und Planung mit einem geringen
  Anspruch an Aktualität ebenso genutzt werden wie für hoch präzise Systeme für
  die Reisendeninformation.


  Nehmen Sie Kontakt mit uns auf.
frontpageTitle: Tralis Livemap
published: true
---
LiveMaps zeigen die Positionen von Fahrzeugen des öffentlichen Verkehrs auf einer Karte. 

In der Grundversion werden die Fahrzeugpositionen auf Basis des **Soll-Fahrplans**, also des mittel- und langfristig geplanten Fahrplanangebots extrapoliert. Zugverspätungen, Ausfälle oder Umleitungen werden dabei ignoriert. Die resultierenden Darstellungen sind daher als Reisendeninformation nur bedingt geeignet. Sie können jedoch einen guten Überblick über das eigentliche Angebot des öffentlichen Verkehrs geben. Weiter sind diese Ansätze auch bei Planern und Entscheidern beliebt, da auch die Möglichkeit besteht, verschiedene Planungsszenarien zu visualisieren. Unsere [weltweit verfügbare Darstellung des öffentlichen Verkehrs](https://tracker.geops.ch/?z=6&s=1&x=1150450.8381&y=6451274.7870&l=transport)  basiert zu einem grossen Teil auf Solldaten.

![](/images/solution/tralis-livemap/tracker-worldwide.png)

Einen Schritt weiter in der Abbildung der tatsächlichen Situation gehen Lösungen, die laufend aktualisierte Abweichungen von den vorgesehenen Ankunfts- und Abfahrtszeiten ("Verspätungen") oder Informationen zu Ausfällen und Umleitungen berücksichtigen, also die **Echtzeit-** oder **Ist-Daten** des Fahrplans. Indem wir die erwarteten Positionen aus dem Soll-Fahrplan mit den Abweichungen kombinieren, kommt die Darstellung auf der Karte der Realität schon sehr nahe. Wie genau die Anzeige ist, hängt in erster Linie von der Qualität dieser Art von Echtzeitdaten ab, die die Leitstellen der Transportunternehmen liefern können. Faktoren, die das Ergebnis verfälschen, sind zum Beispiel die weit verbreitete Rundung von Zeiten auf ganze Minuten, die verzögerte Aktualisierung der Daten, die unvollständige Abbildung von Haltezeiten an Stationen oder von Ausfällen und Umleitungen. Dennoch ergibt sich auf diese Weise bereits ein sehr gutes Bild des aktuellen Betriebsablaufs. 

Ein gutes Beispiel für eine solche LiveMap ist die [Pünktlichkeitskarte der Schweizerischen Bundesbahn SBB](https://maps2.trafimage.ch/ch.sbb.netzkarte?baselayers=ch.sbb.netzkarte,ch.sbb.netzkarte.dark,ch.sbb.netzkarte.luftbild.group,ch.sbb.netzkarte.landeskarte,ch.sbb.netzkarte.landeskarte.grau&lang=de&layers=ch.sbb.puenktlichkeit-all&x=953651.78&y=5998579.74&z=11.049958158687245). Auch in Extremsituationen wie während der starken Schneefälle am 15. Januar 2021 zeigte sie genau, welche Fahrzeuge ausgefallen sind bzw. wie wenige Fahrten überhaupt noch durchgeführt wurden.

![](/images/solution/tralis-livemap/tralis_plan_n.png)

Den grössten Mehrwert entfalten LiveMaps, wenn zusätzlich zum Soll-Fahrplan und den prognostizierten Abweichungen die **tatsächliche Position der Fahrzeuge** berücksichtigt wird. Unser System TRALIS ist in der Lage, diese drei Informationsquellen miteinander zu kombinieren. Fahrzeugpositionen aus GPS-Empfängern oder anderen Ortungssystemen dienen dabei nicht nur dazu, die Position der Fahrzeuge auf der Karte möglichst präzise anzuzeigen, sondern sie werden auch dazu verwendet, die Prognosen aus der Leitstelle zu validieren. Unrealistische Prognosen lassen sich über die Fahrzeiten identifizieren. Ist die im System bekannte, minimale Fahrzeit bis zum Halt länger als die Prognose kann die prognostizierte Ankunftszeit nach oben korrigiert werden. Andererseits muss das System auf die Prognosen aus den Leitstellen vertrauen, wenn die Leitstellen für Ankunft einen späteren Zeitpunkt prognostizieren als sich alleine auf Basis der Fahrzeit erwarten lässt. Denn nur der Überblick aus der Leitstelle kennt die möglichen Hindernisse und Einschränkungen, die vor dem georteten Fahrzeug liegen.