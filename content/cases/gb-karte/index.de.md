---
title: Wo gilt welches ÖV-Abo? Unsere Lösung visualisiert es zuverlässig.
  Schweizweit und automatisiert.
summary: Gemeinsam mit Alliance SwissPass haben wir eine vollautomatisierte
  Kartenlösung entwickelt, die schweizweit die Geltungsbereiche von
  ÖV-Abonnementen über sämtliche Linien und Verkehrsunternehmen präzise, aktuell
  und bedienungsfreundlich visualisiert.
slug: gb-karte
gridWidthFull: true
customer: SBB CFF FFS
service: Automatisierte Kartenlösung, Datenintegration, UX/UI-Konzeption,
  Responsives Frontend
timeline: laufend seit 2022
published: true
content:
  title: Schweizweit klar sehen mit der automatisierten Geltungsbereichskarte
  lead: >-
    <!--StartFragment-->


    Gemeinsam mit Alliance SwissPass haben wir eine vollautomatisierte Kartenlösung entwickelt, die schweizweit die Geltungsbereiche von ÖV-Abonnementen über sämtliche Linien und Verkehrsunternehmen präzise, aktuell und bedienungsfreundlich visualisiert.


    <!--EndFragment-->


    ![](/images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/gb_uebersicht.png "Im Bereich der Jungfraubahnen zeigt die Geltungsbereichskarte sehr detailliert, wo das GA ganz, teilweise oder gar nicht gültig ist.")
  sections:
    - imagePosition: bottom
      highlight: false
      title: Von statischen PDFs zur dynamischen Karten
      text: >-
        <!--StartFragment-->


        Als Vielpendler:in im öffentlichen Verkehr gehört das Generalabonnement (GA) für viele zur Reisealltagserleichterung. Doch gilt es wirklich überall?


        Die SBB produziert seit mehr als 20 Jahren die sogenannten Geltungsbereichskarten in gedruckter Form oder als PDF. Der Wunsch, mehr Details auf den Karten abzubilden, war einer der Treiber für unser Projekt der digitalen Geltungsbereichskarten. Dazu kam, dass eine PDF-Karte den Ansprüchen an digitale Informationsvermittlung nicht mehr genügte. Der wichtigste Grund, warum die bisherigen Karten und die damit zusammenhängende manuelle Pflege der Inhalte abgelöst werden sollte, war die Tatsache, dass die Informationen zu den Geltungsbereichen in anderen Datenbanken bereits vorhanden waren, wo sie als Basis für die Tarifierung und die Billetverkäufe genutzt wurden, und wo daher bereits viel Energie in deren laufende Aktualisierung investiert wurde.


        <!--EndFragment-->
      image: ""
    - imagePosition: bottom
      highlight: false
      title: NOVA-Daten als Fundament für eine neue Kartenlösung
      text: >-
        <!--StartFragment-->


        Die Geltungsbereiche der verschiedenen Abonnemente stammen aus der Tarifdatenbank **NOVA**, die von der SBB im Auftrag des Bundesamts für Verkehr betrieben wird. Diese zentrale Datenbasis liefert alle relevanten Tarifinformationen – von nationalen Bahnstrecken bis zu regionalen Spezialverbindungen. GeOps nutzt diese Daten, um sie mithilfe eines eigenen Routing-Tools präzise auf das gesamte Schweizer ÖV-Netz zu projizieren. Die daraus entstehende Webkarte symbolisiert Geltungsbereiche farblich und macht sie interaktiv abfragbar. Eine intelligente Generalisierungslogik sorgt dafür, dass die Darstellung sowohl auf nationaler Ebene übersichtlich bleibt als auch lokal bis ins Detail hinein korrekt ist.


        <!--EndFragment-->
    - imagePosition: bottom
      highlight: false
      title: Datenintelligenz trifft Kartografie
      text: >-
        Damit die komplexen Abo-Gültigkeitsinformationen aus NOVA für alle
        verständlich und nutzbar werden, verbindet geOps Datenkompetenz mit
        präziser Kartografie. Herzstück ist unser topologisch korrektes
        ÖV-Streckennetz mit detaillierten Linienverläufen und Haltestellen in
        verschiedenen Generalisierungsstufen. Aus den in NOVA hinterlegten
        Tarifkanten – definiert durch Start- und Endhaltestellen – erzeugen wir
        mithilfe unserer eigens entwickelten Routing-Engine präzise
        Linienführungen. Ergänzend kommen Heuristiken zum Einsatz, um
        Sonderfälle wie unterschiedliche Stationsnummern, Flughafenbusse oder
        grenzüberschreitende Verbindungen korrekt darzustellen. So können auch
        Detailunterschiede, etwa im Jungfrauraum oder bei touristischen
        Bergbahnen, zuverlässig abgebildet werden. Für besonders komplexe Fälle,
        wie saisonale Sportbusse oder Richtungseinschränkungen auf dem Bodensee,
        weist die Karte bewusst neutrale Darstellungen mit entsprechenden
        Hinweisen aus. Das Ergebnis ist eine intelligente Verschmelzung von
        Datenmodellierung und Kartengestaltung, die selbst komplizierte
        Tarifszenarien übersichtlich visualisiert. Die Datenintegration und
        Publikation als Vector Tiles ist mit Pipelines komplett automatisiert,
        so dass sie mehrmals jährlich aktualisiert werden kann. 


        ![](/images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/gb1.webp "Die Geltungsbereichskarte der Jungfraubahnen veranschaulicht übersichtlich, wo das GA ganz, teilweise oder nicht gilt.")
      image: ""
    - imagePosition: bottom
      highlight: true
      title: "Blick nach vorn: Blick nach vorn: mehr Funktionen, mehr Abos, mehr
        Klarheit"
      text: >-
        <!--StartFragment-->


        Die Lösung ist produktiv im Einsatz und kann laufend um weitere Aboarten, Regionen oder Funktionen ergänzt werden. Sie schafft eine transparente Grundlage für Auskunfts- und Verkaufssysteme sowie für Endkund:innen. Gleichzeitig zeigt das Projekt, wie sich komplexe Datenstrukturen mit intelligenter Technologie und sorgfältiger Modellierung verständlich aufbereiten lassen. Das ist ein Ansatz, der auch für andere Märkte und Systeme übertragbar ist. Bei der SBB ist die Karte an mehreren Stellen in den [Webauftritt](https://www.sbb.ch/de/abos-billette/abonnemente/ga/ga-geltungsbereich.html) integriert. Im [Webkartenportal von Trafimage](https://maps.trafimage.ch/ch.sbb.geltungsbereiche) ist die Karte eigenständig verfügbar. Bei dieser Variante ist die Funktion zur Suche nach Haltestellen und anderen Orten besonders praktisch. Andere Transportunternehmen, die die Karte auf ihrer Website nutzten wollen, können dazu die [hier dokumentierte](https://jsdoc.maps.trafimage.ch/) Programmierschnittstelle verwenden. 


        <!--EndFragment-->
      image: /images/cases/wo-gilt-welches-öv-abo-unsere-lösung-visualisiert-es-zuverlässig-schweizweit-und-automatisiert/adobestock_867166537.jpeg
testimonialsOnTop: false
testimonials:
  - name: Karin Fankhauser
    position: Nationales Pricing
    text: "*Ich schätze die kundenorientierte Zusammenarbeit. Unsere Anliegen werden
      stets ernst genommen, zeitnah geprüft und abgeklärt sowie mit einem klaren
      und lösungsorientierten Vorschlag beantwortet. Die Umsetzung erfolgt
      unkompliziert und immer im Sinne des Bestellers.*"
    portrait: /images/cases/gb-karte/divers-leinwände-querformat-.png
---
