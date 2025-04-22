---
title: TreeApp in transition - refactoring for the future of the forest
summary: The TreeApp has been technically modernized - with TypeScript, Next.js
  and an integrated database for recommendations. Improved performance, mobile
  usability and new functions such as sharing your own tree species
  recommendations round off the update.
author: Elke Erhardt
cover: /images/blog/treeapp-in-transition-refactoring-for-the-future-of-the-forest/thumbnail_treeapp_0.png
created: 2025-04-14
slug: tree-app-refactoring
tags:
  - treeapp
  - environment
published: true
---
Langfristige Entscheidungen sind das Fundament einer nachhaltigen Waldwirtschaft – und genau hier setzt die [Tree App](https://www.tree-app.ch) an. Entwickelt von geOps im Auftrag der Eidgenössischen Forschungsanstalt für Wald, Schnee und Landschaft (WSL), bietet die App Baumartenempfehlungen für verschiedene Standorttypen, basierend auf Klimaszenarien und aktuellen Forschungsergebnissen. Damit unterstützt sie Waldbewirtschafter:innen bei der zukunftssicheren Planung.

### Warum Refactoring?

Seit der ersten Version der Tree App hat sich nicht nur das Klima verändert, sondern auch die technologische Landschaft. Um die Anwendung langfristig wartbar, flexibel und zukunftsfähig zu machen, wurde entschieden, die bestehende Codebasis grundlegend zu überarbeiten.

Der bisherige Architekturansatz – lokale JSON files als Datenquelle für alle Tree App Daten – brachte Einschränkungen bei Performance, Wartbarkeit und individueller Anpassung. Durch Umstellung auf eine lokale sqlite Datenbank können nun Daten, beispielsweise zum Debugging, einfach über SQL gezielt abgerufen werden. Dieser Upgrade verbessert auch die Gesamtperformance der App.

### Technologisches Upgrade

Im Zuge des Refactorings wurde die Tree App auch technisch in Version 3.0 auf den neuesten Stand gebracht:

* **TypeScript:** Für mehr Typsicherheit, bessere Fehleranalyse und langfristige Wartbarkeit.
* **Tailwind CSS:** Für ein flexibleres, komponentenbasiertes UI
* **Next.js:** Als modernes React-Framework für serverseitiges Rendering, bessere Performance und vereinfachte Routing-Strukturen.
* **sql.js:** Für die clientseitige Nutzung strukturierter Daten, mit nahtloser Integration in die Anwendung.
* **Integrierte Datenbank:** Neu eingeführt, um individuelle Standortpräferenzen und Empfehlungen zu speichern.

### Neues Layout – optimiert für mobile Nutzung

Mit dem Refactoring wurde auch das Layout der Anwendung überarbeitet. Ziel war es, die Anwendungsoberfläche übersichtlicher zu gestalten, Platz effizienter zu nutzen und die Bedienbarkeit auf mobilen Geräten deutlich zu verbessern. Die App passt sich jetzt noch besser an verschiedene Bildschirmgrößen an – ein wichtiger Schritt, da viele Nutzer:innen die Tree App direkt im Feld verwenden.

![](/images/blog/treeapp-in-transition-refactoring-for-the-future-of-the-forest/tree-app_gespeicherte_nutzerdaten.png)

### Gespeicherte Userdaten – Empfehlungen sichtbar machen

Eine der wichtigsten neuen Funktionen der überarbeiteten Tree App ist die Möglichkeit, manuell erstellte Baumartenempfehlungen zu speichern. Nutzer:innen können eigene Standortauswahlen treffen und diese nun dauerhaft in der App hinterlegen.

Diese gespeicherten Daten erscheinen – auf Wunsch – in den Kartenebenen und sind so für alle Nutzer:innen sichtbar. Das fördert den Austausch und bietet Einblick in praxisnahe Einschätzungen vor Ort.

### Kontinuität trotz Veränderung

Trotz der umfangreichen technischen Anpassungen bleibt eines unverändert: Die wissenschaftliche Logik und die Datengrundlage der Tree App. Alle Empfehlungen basieren weiterhin auf den fundierten Erkenntnissen der WSL, inklusive der definierten Standorttypen, Höhenstufen und Klimaszenarien. Auch bestehende Profile und deren Inhalte wurden sorgfältig übernommen und angepasst.

### Fazit

Die Tree App bleibt das, was sie immer war – ein zuverlässiges Werkzeug zur Entscheidungsunterstützung in der Forstwirtschaft. Durch das Refactoring, moderne Technologien, ein verbessertes Layout und neue Funktionen wird sie noch leistungsfähiger und zukunftssicherer – genau wie die Wälder, für die sie entwickelt wurde.

Hier gehts zur [Tree App](https://www.tree-app.ch)