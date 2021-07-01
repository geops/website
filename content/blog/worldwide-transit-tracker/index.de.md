---
title: Weltweiter öV-Tracker
summary: geOps hat einen Tracker des öffentlichen Personenverkehrs
  implementiert. Die Anwendung kombiniert statische Fahrplandaten mit
  Echtzeitdaten aus der ganzen Welt.
slug: weltweiter-ov-tracker
---
#### Mehr als 700 Transportunternehmen

In Zusammenarbeit mit der Universität Freiburg hat geOps einen [Tracker des öffentlichen Personenverkehrs](http://tracker.geops.ch/?z=14&s=20&lat=40.723&lon=-74.002) implementiert. Die Anwendung kombiniert statische Fahrplandaten mit eventuell vorhandenen Echtzeitdaten und berechnet daraus die aktuelle Position eines Fahrzeuges, egal ob Zug, Bus, Strassenbahn, U-Bahn oder Schiff. Die Daten werden aus GTFS Feeds gelesen. Derzeit sind mehr als 700 über die ganze Welt verteilte Feeds integriert. Echtzeitdaten sind unter anderem für [die Niederlande](http://tracker.geops.ch/?z=13&s=1&lat=52.36595686731005&lon=4.904365539550781) verfügbar.

![](/images/blog/weltweiter-ov-tracker/trackerbar.png)

Sind für eine Region keine Echtzeit-Feeds vorhanden oder sind die Realtime-Informationen kurzzeitig nicht verfügbar, so werden die aktuellen Soll-Positionen der Fahrzeuge nach Fahrplan dargestellt. Zur Zeit ist dies für die Mehrheit der Verkehrsgesellschaften der Fall. Auch wenn Echtzeitdaten verfügbar sind ist es möglich, die Visualisierung bis zu 30-fach zu beschleunigen. In diesem Fall basieren die Fahrzeugpositionen dann auf der aktuellen Echtzeit-Verspätung und den Fahrplandaten für die nächsten Stunden.

Das Backend ist darauf optimiert, möglichst viele Fahrtbewegungen (Trajektorien) in möglichst kurzer Zeit auszugeben, so dass sie im Endgerät ohne grossen Rechenaufwand visualisiert werden können. Zu diesem Zweck wurden sowohl Server als auch Client im Rahmen einer [Masterarbeit](http://ad-publications.informatik.uni-freiburg.de/theses/Master_Patrick_Brosi_2014.pdf) an der [Uni Freiburg](https://ad.informatik.uni-freiburg.de/front-page-en?set_language=en) komplett neu entwickelt. Für den jetzt veröffentlichten Tracker wird die Software bei geOps laufend weiterentwickelt.

Der Tracker hält die GTFS-Feeds aller Regionen gleichzeitig vor. Damit können sämtliche im aktuellen Kartenausschnitt verkehrenden Fahrzeuge angezeigt werden, auch wenn die Daten von verschiedenen Transportunternehmen stammen. Die Effizienz des Trackers ist so gut, dass eine Beschleunigung der Simulation auf bis zu 30-fache Geschwindigkeit problemlos möglich wird, wobei die Bewegung der Fahrzeuge dennoch sehr flüssig bleibt.

#### Mapping der Streckenverläufe

GTFS Feeds können neben den Fahrplandaten auch exakte Fahrtverläufe ("Shapes") beinhalten. Die Visualisierung im Tracker basiert wenn möglich auf diesen Shapes. Manche GTFS Feeds enthalten allerdings keine oder sehr ungenaue Fahrtverläufe. Um auch solche Daten möglichst korrekt auf einer Karte anzuzeigen hat geOps spezielle Routing-Algorithmen entwickelt.

Ausgangspunkt sind dabei die im GTFS Feed enthalten Stationen, die mit Koordinaten georeferenziert sind. In Kombination mit einem topologischen Netzwerk von Bahnstrecken und Strassen werden die exakten Verbindungen zwischen den Stationen hergeleitet. Dabei werden zahlreiche Spezialfälle berücksichtigt, um ein zufriedenstellendes Ergebnis zu erzielen. Beim Mapping von Buslinien werden beispielsweise Strassenkategorien, Einbahnstrassen oder für Busse gesperrte Strassen in die Wegfindung integriert. Auch Fehler im Netzwerk werden in einem gewissen Rahmen automatisch korrigiert.

In der aktuellen Version basieren zum Beispiel [die Streckenverläufe in der Schweiz](http://tracker.geops.ch/?z=15&s=30&lat=47.37955096693522&lon=8.538994789123535) auf einem Mapping mit OpenStreetMap-Daten. Trotz einer sehr weit ausgereiften Logik bei der Routenfindung bleiben am Ende immer noch Problemfälle, die manuell - am besten mit Beteiligung der Transportunternehmen - gelöst werden müssen. Für die Schweiz ist ein entsprechendes Projekt bereits in Vorbereitung.

![](/images/blog/weltweiter-ov-tracker/trackeramsterdam.png)

#### Weiterer Ausbau

Der Tracker soll kontinuierlich um weitere Transportunternehmen ergänzt werden. Mindestens für Europa und Nordamerika könnte eine flächendeckende Darstellung des öffentlichen Verkehrs in naher Zukunft möglich sein.

Wir integrieren gerne weitere Fahrplandaten, die uns von den Transportunternehmen geliefert werden, oder die mit Genehmigung der Unternehmen als OpenData zur Verfügung gestellt wurden. Fahrplandaten, die im System integriert sind, sind geschützt und können nicht heruntergeladen werden. Wir betonen ausdrücklich, dass es sich bei dem System nicht um eine Fahrplanauskunft mit verbindlichem Charakter handelt.

Gerne stehen wir bei der Aufbereitung von Fahrplandaten als GTFS Feeds und dem Mapping von Streckenverläufen beratend und mit unseren Dienstleistungen zur Verfügung.

[Tweets about "tracker.geops"](https://twitter.com/search?q=tracker.geops) !function(d,s,id){var js,fjs=d.getElementsByTagName(s)\[0\],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");