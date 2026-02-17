---
title: Smarte Live-Infos für S-Bahn-Fahrgäste in München.
summary: Mit der Livemap für die Münchner S-Bahn zeigen wir, wie moderne
  GPS-Daten in Echtzeit zu präzisen Abfahrsinformationen und einer intuitiven
  Kartenansicht kombiniert werden. Die Lösung liefert Updates in
  Sekundenbruchteilen und macht Informationen mobil nutzbar, entweder in der
  Navigator App, direkt auf der Karte oder über einen Liniennetzplan.
slug: s-bahn-muenchen
gridWidthFull: true
customer: DB Regio AG
service: Livemap, Schnittstelle für Fahrplan und Echtzeitdaten,
  Störungsinformationen, Datendrehscheibe
timeline: laufend seit 2017
published: true
content:
  title: S-Bahn München in Echtzeit mit unserem Echtzeitinformationssystem
  lead: Mit der [Livemap für die Münchner
    S-Bahn](https://s-bahn-muenchen-live.de/?mode=schematic&x=2285725&y=1746650&z=5.82) zeigen
    wir, wie moderne GPS-Daten in Echtzeit zu präzisen Abfahrsinformationen und
    einer intuitiven Kartenansicht kombiniert werden. Die Lösung liefert Updates
    in Sekundenbruchteilen und macht Informationen mobil nutzbar, entweder in
    der Navigator App, direkt auf der Karte oder über einen Liniennetzplan.
  sections:
    - imagePosition: bottom
      highlight: false
      title: Dichtester Verkehr auf zwei Gleisen
      text: "Nirgendwo in Europa gibt es mehr Verkehr auf zwei Gleisen: Mit rund 1000
        Zügen am Tag verzeichnet die S-Bahn-Stammstrecke München das höchste
        Verkehrsaufkommen. Gleichzeitig fährt sie an ihrer Kapazitätsgrenze. Mit
        der im Bau befindlichen 2. Stammstrecke wird München den lang ersehnten
        Bypass für die bestehende West- Ost-Querung bekommen. Parallel dazu
        optimieren die Betreiber laufend die Infor­mation der Kund:innen. Zur
        besseren Information über die aktuelle Betriebssituation hat die DB
        Regio geOps mit dem Aufbau eines Echtzeitinformationssystems beauftragt.
        Dabei werden GPS-Daten aus den S-Bahnen für die Anzeige der
        Zugpositionen auf einer Karte und für die Erstellung von
        Abfahrtsprognosen genutzt."
      image: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/12.png
    - imagePosition: bottom
      highlight: false
      title: So machen wir bei geOps Echtzeit sichtbar
      text: >-
        In Spitzenzeiten verkehren rund 100 S-Bahnen gleichzeitig im Münchner
        Netz. Jede davon sendet etwa alle zehn Sekunden ein GPS-Signal, das
        neben der Position auch Informationen zur aktuellen Formation und zum
        Status des Zuges enthält. Das von geOps entwickelte System liest
        einerseits die GPS-Daten der Züge und andererseits den Fahrplan und
        Echtzeitdaten zu Ausfällen und Verspätungen. Alle Quellen werden
        miteinander verschnitten, um die Fahrplandaten zu validieren und
        genauere Prognosen zu erstellen. Wie es beim engen Takt der S-Bahn von
        teils unter 1 Minute angebracht ist, zielen die Vorhersagen darauf ab,
        dem Fahrgast die nächsten Fahrmöglichkeiten präzise und optisch
        übersichtlich anzuzeigen. 


        Das System der Live Maps wird über eine eigenständige Webseite betrieben, die sowohl im [Webauftritt der S-Bahn München](https://s-bahn-muenchen-live.de/) wie auch in der offiziellen Auskunfts-App, dem München Navigator, integriert ist.
      image: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/11.png
    - imagePosition: bottom
      highlight: false
      title: Präzision im Sekundentakt
      text: Pro Minute werden bis zu 900 Signale aus den Zügen verarbeitet und mittels
        ausgefeilter Heuristiken analysiert. Nur zwei Sekunden nach dem Senden
        jedes Signals aus dem Zug sind die Daten im System von geOps verarbeitet
        und werden an die Client-Geräte weitergeleitet. Auf Client-Seite sieht
        der Reisende die Informationen auf einer Karte oder einem Liniennetzplan
        sowie in der Perlenkette und einem Abfahrtsanzeiger. Auf der Karte
        lassen sich die Stationen auswählen, worauf alle Abfahrten angezeigt
        werden.
    - imagePosition: bottom
      highlight: false
      title: "Die technische Basis: TRALIS als Datendrehscheibe, MOCO für
        Störungsmeldungen"
      text: Die Basis der Pünktlichkeitskarte ist die gleiche wie auch für
        unseren [weltweiten
        Zugtracker](https://mobility.portal.geops.io/de/world.geops.transit?world.geops.traviclive).
        Für die Verarbeitung und Analyse von Soll- und Echtzeitdaten kommt
        TRALIS, unsere Datendrehscheibe, zum Einsatz. TRALIS ist optimiert
        dafür, auch grosse Datenmengen zu integrieren, zu analysieren und mit
        minimalen Latenzen wieder an die Abnehmersysteme auszugeben. Für die
        Live Map der S-Bahn München wurden die Standardfunktionen zur
        Verarbeitung von Soll- und Echtzeitdaten erweitert, um zusätzlich
        GPS-Daten zu analysieren. Die tatsächliche Position des Zuges, die der
        GPS-Sender liefert, wird zur Überprüfung und Anpassung der
        Echtzeitprognosen aus den Leitstellen der Bahn verwendet. Für die
        Darstellung von Meldungen zu Bauarbeiten, Haltausfällen, Unterbrüchen
        oder Ersatzverkehren kommt MOCO zum Einsatz, das Redaktionstool für
        Störungsmeldungen. MOCO nutzt über eine Schnittstelle die Meldungen aus
        den Leitsystemen der Bahn. Vollautomatisch werden mit MOCO die Meldungen
        auf Linien oder Haltestellen zur Darstellung im Netzplan abgebildet.
        Nach Bedarf können einzelne Meldungen in MOCO mit weiteren Informationen
        einschliesslich Links, Fotos und Grafiken ergänzt werden.
    - imagePosition: bottom
      highlight: true
      title: "Blick nach vorn: Livemaps für mehr Infos und Sicherheit"
      text: Die Live-Karte wird inzwischen von den Kund:innen der S-Bahn München sehr
        geschätzt. Besonders bei Betriebsstörungen greifen bis zu 300.000
        Personen gleichzeitig auf das Angebot zu. Zahlreiche Kommentare
        beschreiben die Live-Karte als die zuverlässigste Informationsquelle für
        die S-Bahn in München. Aufgrund der positiven Resonanz wurde das System
        auf weitere S-Bahnen in Deutschland sowie für den Ersatzverkehr
        ausgeweitet. Durch die laufende Integration weiterer Informationen
        entwickeln sich die Live Maps zu der umfassenden Informationsquelle für
        die Reisenden. Neben den eigentlichen Echtzeitdaten sind besonders die
        Störungsinformationen, die sowohl in Textform wie auch als
        Streckenmarkierungen auf der Karte eingeblendet werden, und Angaben zu
        Alternativrouten wichtige Erweiterungen.
      image: /images/cases/smarte-live-infos-für-s-bahn-fahrgäste-in-münchen/adobestock_581571846_editorial_use_only.jpeg
testimonialsOnTop: false
testimonials:
  - position: Fahrgastinformation QS und Projekte, DB Regio AG (2025)
    name: Carola Bertsch
    text: Die Zusammenarbeit mit geOps seit mittlerweile 5 Jahren ist hervorragend.
      Weiterentwicklungen werden professionell, kreativ und umsetzungsorientiert
      gemeinsam besprochen, angegangen und zielgerichtet umgesetzt. Auch bei
      Qualitätssicherungsthemen ist die Zusammenarbeit immer äusserst
      zuverlässig und fokussiert. Auf dem Niveau macht das gemeinsame Erreichen
      von Zielen Spass.
    portrait: /images/cases/s-bahn-muenchen/divers-leinwände-querformat-.png
---
