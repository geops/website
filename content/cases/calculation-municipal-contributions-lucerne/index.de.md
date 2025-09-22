---
title: "Mehr Effizienz durch Digitalisierung: Berechnung der Gemeindebeiträge im
  öV im Kanton Luzern"
summary: Mit unserer automatisierten Lösung wird die Berechnung der
  ÖV-Gemeindebeiträge im Kanton Luzern effizient, fehlerfrei und
  nachvollziehbar. GTFS-Daten ermöglichen ein transparentes Verfahren. Statt
  manueller Excel-Auswertungen gibt es jetzt auf Knopfdruck korrekte und
  nachvollziehbare Zahlen.
slug: berechnung-gemeindebeitraege-luzern
customer: Verkehrsverbund Luzern VVL
service: Automatisierte Fahrplanauswertung
timeline: Seit 2023
published: true
content:
  lead: Mit unserer automatisierten Lösung wird die Berechnung der
    ÖV-Gemeindebeiträge im Kanton Luzern effizient, fehlerfrei und
    nachvollziehbar. GTFS-Daten ermöglichen ein transparentes Verfahren. Statt
    manueller Excel-Auswertungen gibt es jetzt auf Knopfdruck korrekte und
    nachvollziehbare Zahlen.
  title: "Mehr Effizienz durch Digitalisierung: Berechnung der Gemeindebeiträge im
    öV im Kanton Luzern"
  sections:
    - orientation: column
      title: Hoher Aufwand für faire Kostenverteilung
      text: >-
        Der öffentliche Verkehr im Kanton Luzern wird von den beteiligten
        Gemeinden mitfinanziert. Damit die Kosten gerecht verteilt werden,
        berechnet der VVL jährlich
        die [Gemeindebeiträge](https://www.vvl.ch/oev-angebot/dienstleistungen/finanzierung/gemeindebeitraege).
        Eine Grundlage dafür ist die Anzahl der Abfahrten an allen Haltestellen
        einer Gemeinde. Das ist eine an sich klare Methode, die in der Praxis
        jedoch aufwendig umzusetzen war.


        Bislang wurden die Fahrplandaten von den Transportunternehmen ausgewertet, manuell in eine Vorlage übertragen, dem VVL zugestellt und dort stichprobenartig überprüft. Dieser Prozess bedeutete für die Transportunternehmen und den VVL einen grossen Aufwand und war zugleich fehleranfällig. Der VVL suchte deshalb nach einer Lösung, um den Prozess zu automatisieren und gleichzeitig die Qualität und Nachvollziehbarkeit der Ergebnisse zu erhöhen.
    - orientation: row
      title: Automatisierung mit offenen GTFS-Daten
      text: >-
        Unsere massgeschneiderte Lösung basiert auf den offenen Fahrplandaten
        (GTFS) von [opentransportdata.swiss](https://opentransportdata.swiss/).
        Sie ermittelt automatisch die Anzahl der Abfahrten pro Haltestelle und
        Gemeinde – und berücksichtigt dabei alle relevanten Sonderfälle:


        * **Saisons und Feiertage** mit abweichenden Fahrplänen

        * **Schlaufen**, bei denen Fahrten nicht doppelt gezählt werden dürfen

        * **Nicht beitragsrelevante Linien oder Kategorien**, die gefiltert werden

        * **Temporäre Einschränkungen**, z. B. durch Baustellen, die ignoriert werden


        Die Berechnung ist transparent und jederzeit nachvollziehbar. Auffälligkeiten und Inkonsistenzen werden automatisch erkannt, sodass ein qualitätsgesichertes Ergebnis gewährleistet ist.
      image: /images/cases/calculation-municipal-contributions-lucerne/vvl.png
    - orientation: column
      title: Mehr Tempo, weniger Fehler, zufriedene Partner
      text: >-
        Was früher viele Stunden manueller Arbeit bedeutete, läuft nun
        weitgehend automatisiert. Schnell, zuverlässig und transparent.


        * Deutlich weniger Aufwand für Auswertungen und Nacharbeiten

        * Weniger Aufwand für administrative Prozesse

        * Fehlerreduktion durch automatisierte Berechnungen und integrierte Qualitätssicherung

        * Klar nachvollziehbare Ergebnisse für Gemeinden und Transportunternehmen

        * Flexible Anpassbarkeit für zukünftige Linien, Haltestellen oder Regelungen


        Das Projekt konnte dank unserer Erfahrung und der Nutzung standardisierter Datenformate mit minimalem Aufwand realisiert werden und das zur vollen Zufriedenheit der Kundin.
    - orientation: column
      title: Datenqualität auf Knopfdruck
      text: Während früher eine leere EXCEL-Tabelle am Anfang des Prozesses stand,
        liefert die neue Lösung eine vollständig befüllte EXCEL-Tabelle als
        Ergebnis aus. Wir haben uns hier für EXCEL als Ausgabeformt entschieden,
        um dem VVL grösstmögliche Flexibilität bei der weiteren Auswertung  zu
        geben. Das Einlesen der Fahrplandaten und das korrekte Zählen der
        Abfahrten erfolgen in unserer Datendrehscheibe und mit DuckDB. Die rohen
        Ergebnisse schreiben wir dann in eine EXCEL-Vorlage, in der vorbereitete
        Formeln und Pivot-Abfragen automatisch verschiedene Sichten und
        Gruppierungen der Daten erzeugen. Der VVL kann diese Daten in seine
        ERP-Systeme einlesen oder für weitere Auswertungen mit den gewohnten
        EXCEL-Bordmitteln überarbeiten. Die Steuerung des gesamten Prozesses vom
        Einlesen der Daten bis zur Ausgabe als EXCEL ist in unserer
        Build-Umgebung als Gitlab CI/CD-Pipeline aufgebaut und kann so jederzeit
        auf Knopfdruck wiederholt werden.
    - orientation: column
      title: "Blick nach vorn: gemeinsam mehr erreichen"
      text: Digitale Lösungen wie diese zeigen, wie offene Daten und intelligente
        Systeme den ÖV-Alltag einfacher machen können. Sie sparen Zeit, erhöhen
        die Transparenz und schaffen Vertrauen zwischen allen Beteiligten.
testimonials:
  - text: Das manuelle Verarbeiten von rund 140 Exceldateien gehört der
      Vergangenheit an. Dank der automatisierten Fahrplanauswertung von geOps
      sparen wir Zeit, reduzieren Fehler und gewinnen spürbar an Effizienz –
      nicht nur bei uns, sondern auch bei den Transportunternehmen.
    position: Fachspezialistin Finanzen öV, VVL
    name: Sylvie Gernet
---
