---
title: Fallbacks in MediaWiki
summary: >-
  Eine unserer Applikationen verwendet eine Wiki-Installation um Hilfetexte
  kontextsensitiv darzustellen. Die Texte liegen in Form von Artikeln in
  MediaWiki vor – die gleiche Technik wie sie Wikipedia verwendet. Durch die
  Entwicklung unserer Applikation als Software-Produktlinie bot es sich an beim
  Verfassen von Hilfetexten ähnlich zu verfahren. Ein Fallback erlaubt es nun
  mit einer einzigen Wiki-Installation spezifische Hilfetexte für Kunden
  mehrsprachig auszuliefern. Grundlage ist eine Sammlung von allgemeingültigen
  Hilfetexten, die im Bedarfsfall für die Kunden angepasst und übersetzt werden
  können.

  Alle Kunden können so direkt von verbesserter Dokumentation profitieren und gleichzeitig individuelle Inhalte integrieren. Die Inhalte der Hilfe können dabei vom Kunden einfach und flexibel im bewährten MediaWiki angepasst werden."
author: Friedjoff Trautwein
created: 2011-02-04
slug: fallbacks-in-mediawiki
tags:
  - developers
published: false
---

**Die Extension steht derzeit noch nicht auf github. Lokal ist sie unter https://ssl.geops.de/svn/mediawiki-clientredirect verfügbar.** Außerdem enthält das Repository 2 Dateien, die die PDFBook-Extension um die Redirects erweitern. Wollen wir diese überhaupt im Zuge dieses Artikels veröffentlichen?

geOps bietet zu seinen Applikationen Hilfetexte als Wiki-Artikel an. Die Texte können also einfach angepasst werden und werden kontextsensitiv präsentiert. _Letzteres wird in einem nachfolgenden Artikel konkret erklärt._

Wir bieten eine Sammlung von Hilfetexten an, die auf die gesamte Produktlinie zutreffend sind. Diese Sammlung bildet sozusagen den Grundstock an Hilfetexten für alle Benutzer der [Software-Produktlinie](http://www.sei.cmu.edu/productlines/ "Einführung in Software-Produktlinien der Cargenie Mellon University"). Varianten der Produktlinie werden als Anwendungen beim Kunden genutzt. Ebenso wie Synergieeffekte  bei der Entwicklung von Anwendungen genutzt werden, wollten wir diese beim Inhalt des Hilfesystems nutzen.

Mit einer Erweiterung für [MediaWiki](http://www.mediawiki.org/) ist dies gelungen. Zu jedem Artikel im Wiki (entspricht einem Hilfetext) können nun kundenspezifische Versionen angelegt werden. Je nach Kunde liefert liefert das Wiki die spezifischen Hilfetexte. Sollte kein spezifischer Inhalt existieren, wird automatisch die allgemeingültige Version des Hilfetext geliefert.

Bei der Ermittlung der Sprache wird ähnlich verfahren: Wenn der Artikel in der Wunschsprache des Benutzers vorliegt, wird diese Version natürlich verwendet. Sollte dies nicht möglich sein, dann bekommt der Benutzer einen Artikel in der Systemsprache angezeigt.

Die von geOps entwickelte MediaWiki-Erweiterung priorisiert die Auslieferung von Artikeln wie folgt;

- Kundenspezifische Version in Wunschsprache
- Kundenspezifische Version
- Allgemeine Version in Wunschsprache
- Allgemeine Version

![Entscheidungspunkte der Priorisierung bei Auslieferung von Wiki-Artikeln](/images/blog/fallbacks-in-mediawiki/entscheidungspunkte.png)

Die Priorisierung der erfolgt selbstverständlich für den Benutzer transparent. Das heißt bei Verfügbarkeit eines besser passendem Artikel wie dem angefragtem wird dieser geliefert, andernfalls eben der angefragte Artikel.

Unsere angesproche Erweitung für MediWiki erhalten sie finden Sie zu eigenen Verwendung bei [GitHub](https://github.com/geops/mediawiki-extensions/clientredirect "Code-Repository des Wiki-Fallbacks").
