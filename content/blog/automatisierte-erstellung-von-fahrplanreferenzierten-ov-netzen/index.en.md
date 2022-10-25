---
title: Automated creation of timetable-referenced public transport networks
summary: The creation of timetable-referenced routes for public transport is demanding and is usually, if at all, done by hand.
  We use a route-finding based approach to
  correlate timetable trajectories and (possibly generalized) geodata.
cover: /images/blog/automatisierte-erstellung-von-fahrplanreferenzierten-ov-netzen/genf_small_0.png
created: 2015-06-13
slug: automated-creation-of-timetable-referenced-public-transort-networks
tags:
  - mobility
  - routing
  - maps
published: true
---

![](/images/blog/automatisierte-erstellung-von-fahrplanreferenzierten-ov-netzen/genf_small_0.png)

Die Erstellung von fahrplanreferenzierten Linienverläufen des öffentlichen Nahverkehrs ist anspruchsvoll und wird meist, wenn überhaupt, von Hand durchgeführt. Automatisierte Ansätze scheitern meist an der Unschärfe der zugrunde liegenden Referenz-Geodaten oder an der Etablierung einer Korrelation dieser zum Fahrplan. Methoden, die auf Ähnlichkeitsmaßen entweder zwischen den Attributen oder den Geometrien (oder beidem) beruhen, setzen meist eine gewissenhafte Nachführung und eine prinzipielle Korrelierbarkeit der Attribute (über eindeutige IDs, Stations- und Liniennamen o. Ä.) in beiden Datensätzen voraus. Wir benutzen einen routenfindungsbasierten Ansatz, um Fahrplanverläufe und (evtl. generalisierte) Geodaten aufeinander zu korrelieren. Zur Herstellung einer Beziehung zwischen Fahrplanfahrt und Referenzgeometrie fügen wir fahrplanmäßige Stationen in die Referenzdaten ein, überführen diese in einen Graph und versuchen mittels Heuristiken insbesondere an Haltestellen und bei Lücken im Geodatensatz die topologische Korrektheit desselben zu garantieren. Wir erzeugen Fahrtverlaufsgeometrien, indem wir eine iterative Shortest-Path-Suche zwischen aufeinanderfolgenden Stationen ausführen. Die Kostenfunktion für den Wegfindungsalgorithmus ist dynamisch und folgt Heuristiken, die das optimale Resultat für das verwendete Verkehrsmittel generieren sollen.

Im Anhang findet sich die Präsentation eines auf der [AGIT 2015 in Salzburg](http://www.agit.at/) gehaltenen Vortrags, in der das Vorgehen genauer erläutert wird.
