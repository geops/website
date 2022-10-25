---
title: Schweizer Fahrplan im GTFS-Format verfügbar
summary: Wir stellen regelmässig aktualisierte GTFS Feeds der offiziellen
  Schweizer Fahrplandaten zur Verfügung.
slug: schweizer-fahrplan-im-gtfs-format-verfugbar
---
Auf unserer Seite [gtfs.geops.ch](http://gtfs.geops.ch) stellen wir laufend aktualisierte GTFS-Feeds der Schweizer Fahrplandaten für den kostenfreien Download zur Verfügung. Die Feeds basieren auf dem [offiziellen Schweizer Fahrplan](http://www.fahrplanfelder.ch/de/fahrplandaten/), der im HAFAS-Format publiziert wird. Wir konvertieren die Daten wöchentlich kurz nachdem sie auf [www.fahrplanfelder.ch](http://www.fahrplanfelder.ch) publiziert wurden, so dass Sie jeden Dienstag neue Daten vorfinden (nur wenn der Montag auf einen Feiertag fällt, verzögert sich die Publikation der Originaldaten und der GTFS-Feeds).

Die Konvertierung der Rohdaten macht die Fahrplandaten einem erweiterten Kreis von Entwicklern zugänglich. GTFS ist besser strukturiert, einfacher zu benutzen, einfacher zu erweitern und besser dokumentiert als HAFAS-Rohdaten. Das zugrundeliegende Dateiformat (CSV) kann sowohl maschinell als auch von Menschen einfach gelesen werden. Darüberhinaus existiert ein umfangreiches Angebot von Tools zur Validierung, Visualisierung, Bearbeitung und Änderung von GTFS-Feeds. Open Source Routenfinder wie OTP unterstützen GTFS bzw. akzeptieren GTFS als einziges Eingabeformat für Fahrplandaten.

Die Feeds, die zum freien Download zur Verfügung stehen, enthalten nicht alle Informationen, die in den Originaldaten vorhanden sind. Sie sind jedoch insoweit vollständig, als sie bei der Suche nach Verbindungen alle möglichen Optionen fehlerfrei und vollständig zurückliefern können. Für Bedürfnisse, die über die öffentlich angebotene Version hinausgehen, bieten wir gerne unsere Dienstleistungen an. Dazu gehören Aufwertungen der Feeds in den folgenden Bereichen:

*   Extraktion aller in den Rohdaten vorliegenden Informationen und Übernahme gemäss den GTFS-Spezifikationen.
*   Exakte geographische Verortung der Linienverläufe aller Züge, Busse und anderer Verkhersmittel durch ein spezielles Routing-Verfahren. Daten dieser Art werden zum Beispiel in unserem weltweiten öV-Tracker [TRAVIC](http://tracker.geops.de/?z=13&s=1&lat=47.3774&lon=8.5455) verwendet.
*   Extraktion der Daten für bestimmte Regionen, Verkehrsmittel oder Verkehrsbetriebe.
*   Zusammenführen mit weiteren Feeds zur Erstellung grenzübergreifender Datensätze.

Neben der einmaligen Konvertierung stellen wir alle Daten als Dienste zur Verfügung, die laufend aktualisiert und dem Kunden zum Download zur Verfügung gestellt werden. Gerne erhalten Sie von uns [weitere Informationen](/about) .