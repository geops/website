---
title: Praktikum bei geOps - Özkan Yanikbas
summary: Im Zeitraum März bis Juli 2020 war ich Teil des geOps Teams in
  Freiburg, machte großartige Erfahrungen und nahm an interessanten Projekten
  teil. Hier gebe ich Einblicke in diese Zeit.
slug: praktikum-bei-geops-ozkan-yanikbas
---
Über mich
---------

Ich bin Özkan, 23 Jahre alt, und komme aus dem Raum Freiburg. 2018 habe ich eine Ausbildung im Bereich Fotografie und Medien an der Gertrud Luckner Gewerbeschule in Freiburg abgeschlossen. In dieser Zeit machte ich meine ersten Kontakte zur Webentwicklung. Anfangs lernte ich einfachen HTML Markup, CSS und später JavaScript, unter anderem mit Vue.js und Node.js. Seitdem hat es mich gepackt, weshalb ich mich dann im Jahr 2019 dazu entschieden habe, Medieninformatik an der Hochschule in Furtwangen zu studieren.

Nach einem erfolgreichen Grundstudium stand das dritte Semester vor der Tür, was bei unserer Hochschule ein Praxissemester ist.

Bewerbungsprozess
-----------------

Auf geOps bin ich durch eine Suche nach lokalen Unternehmen im Bereich der Webentwicklung gestoßen. Zu diesem Zeitpunkt hatte geOps zwar keine Stellenanzeige für Praktikanten offen, durch eine Initiativbewerbung bekam ich trotzdem die Chance mich vorzustellen. Nach einem netten und sehr transparenten Gespräch erhielt ich die Möglichkeit für ein Praktikum.

Meine Projekte
--------------

### Log-Parser

![](/images/blog/praktikum-bei-geops-ozkan-yanikbas/log-parser-2.png)

Der Log-Parser war eines der beiden größeren Projekte, das ich in meinem Praktikum bearbeiten durfte. Es handelt sich dabei um ein internes Tool, welches die Entwickler verwenden, um die Ergebnisse der geOps Routing API zu analysieren und laufende Optimierungen umzusetzen.

Wir haben ein einfaches, ansprechendes User Interface bereitgestellt, das alle Routing-Ergebnisse in einer Tabelle darstellt. Man kann durch Symbole sehen, ob die Anfrage zum Anfragezeitpunkt erfolgreich war oder nicht. Das Hilfreiche an diesem Tool ist, dass es die Möglichkeit gibt, die Anfragen erneut durch die Routing API zu jagen, um einen Vergleich zu schaffen. Alle Anfragen können eingesehen werden, wodurch man die Antwort der jeweiligen Anfrage sehen kann. 

![](/images/blog/praktikum-bei-geops-ozkan-yanikbas/log-parser%20to%20geops-routing-demo_0.png)

Außerdem haben wir zum Testen des Routings eine auch öffentlich verfügbare [Demo](https://routing-demo.geops.io/) benutzt. Jeder Eintrag aus dem Log-Parser verlinkt auf die Demo, so dass die Ergebnisse des Routings auch visuell überprüft werden können.

![](/images/blog/praktikum-bei-geops-ozkan-yanikbas/log-parser-1_0.png)

Zuletzt bietet der Log-Parser auch die Möglichkeit, weitere Informationen durch die geOps StopFinder API zu erlangen. So können einzelne Haltestellen nicht nur angezeigt sondern auch getestet werden.

#### Gelernte Bereiche:

*   Vue.js
*   Regular Expressions
*   API Nutzung
*   Grundwissen über Routing

### Railview

![](/images/blog/praktikum-bei-geops-ozkan-yanikbas/Railview%20%282%29_0.png)

Das zweite große Projekt, womit ich mich gegen Ende meiner Praktikumszeit beschäftigen durfte, war [Railview](https://railview.geops.io). Railview zeigt die Orte, an denen Fabio, ein leidenschaftlicher Lokführer der [Rhätischen Bahn](https://twitter.com/rhaetischebahn), die Fotos geschossen hat, die er in seinem Twitter-Account [@calandamountain](https://twitter.com/calandamountain) veröffentlicht.

Technisch bilden von geOps bereitgestellte Webdienste und Open Source Bibliotheken die Grundlage der Karten-App. Dazu gehören Kartendienste und öV-spezifische APIs wie der StopFinder sowie die JavaScript-Bibliotheken [react-spatial](http://react-spatial.geops.de/) und [mobility-toolbox](https://mobility-toolbox-js.geops.io/).

![](/images/blog/praktikum-bei-geops-ozkan-yanikbas/Bildschirmfoto%202020-08-01%20um%2009.56.16%20%281%29_0.png)

Eine der großen Herausforderungen dieses Projekts für mich war, mich mit dem für mich neuen JavaScript Framework React zu beschäftigen. Da ich schon Erfahrungen in JavaScript und Bibliotheken wie Vue.js hatte, war das für mich auch sehr ansprechend.

Meine Arbeit begann mit der Nachforschung über die Realisierbarkeit der Applikation. Denn das Projekt steht und fällt, ob Twitter einen Dienst anbietet, der es uns ermöglicht, Tweets von öffentlichen Timelines zu extrahieren. Nach erfolgreicher Forschung haben wir gemeinsam im Team darüber diskutiert, wie die technischen Anforderungen an das gesamte Projekt aussehen. 

Ich beschäftigte mich fortan mit dem Frontend der Railview App, während meine Kollegen den Backend-Dienst und eine Verwaltungssoftware zur Auswahl der relevanten Tweets entwickelten.

![](/images/blog/praktikum-bei-geops-ozkan-yanikbas/Bildschirmfoto%202020-08-01%20um%2009.59.25%20%281%29_0.png)

Durch einen hervorragenden Klick-Prototypen unseres UX-Designers hatte ich klare Vorgaben, an denen ich mich bei der Entwicklung orientieren konnte. Während der Programmierung griffen mir auch immer wieder die Kollegen aus dem Team unter die Arme und erklärten mir die Techniken, die ich noch nicht kannte oder konnte.

#### Gelernte Bereiche:

*   React
*   SASS
*   OpenLayers
*   Grundwissen über Karten & Koordinaten

### Was ich gut fand

Das JavaScript Frontend-Team war eine unerschöpfliche Stütze. Bei Problemen oder Fragen waren sie immer bereit eine Lösung zu finden oder Vorschläge zu machen. Selbstverständlich waren alle anderen Kollegen im gesamten Zeitraum auch immer hilfreich und unterstützten mich. Im Büro war das Arbeitsklima stets ruhig und angenehm. Ich wurde bei meiner Arbeit nie gestört und konnte produktiv arbeiten.

Schon kurz nach Beginn des Praktikums erforderte die Corona Pandemie viele Anpassungen an der Arbeitsweise. Innerhalb kurzer Zeit mussten alle Mitarbeiter ihre Tätigkeit aus dem Home Office erbringen. Für mich stellte geOps extra einen Laptop zur Verfügung. Die Kommunikation im Home Office war perfekt und litt kaum an der fehlenden Präsenz. Jeden Tag gab es Besprechungen, um alle Mitarbeiter auf dem Laufenden zu halten. Projekte wurden nochmal einzeln in kleineren Teams besprochen.

Fazit
-----

Ich konnte im gesamten Zeitraum viel dazu lernen. Den Umgang mit der Versionierungssoftware Git lernte ich intensiv, da es einfach zum professionellen Alltag dazu gehört. Meine Fähigkeiten in JavaScript, CSS und SASS stiegen durch regelmäßige Code Reviews.

Neben den Technologien, die ich schon weiter oben genannt habe, konnte ich noch in den folgenden Bereichen wertvolle Einblicke gewinnen:

*   Allgemeine verbesserte Fähigkeiten in JavaScript
*   Python
*   Automatisierte Prozesse

Der Alltag bei geOps bestätigte mir meinen Berufswunsch im Bereich der Webentwicklung.

Ich danke dem gesamten Team für die gute Zeit und wünsche euch allen nur das Beste.

  
  
Özkan