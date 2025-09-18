---
title: NVBW Anschlusssicherung
summary: Ein leistungsstarker, attraktiver und zuverlässiger ÖPNV bildet das
  Herzstück einer erfolgreichen Verkehrswende. Neben der Pünktlichkeit von Zügen
  und Bussen ist die Gewährleistung der vorgesehenen Anschlüsse  ein ganz
  wichtiger Punkt, der das Vertrauen der Reisenden in den ÖPNV prägt.
slug: nvbw-anschlusssicherung
gridWidthFull: false
customer: |-
  NVBW - Nahverkehrsgesellschaft
  Baden-Württemberg mbH
service: "Automatisierte Fahrplanauswertung\t"
published: true
content:
  lead: Ein leistungsstarker, attraktiver und zuverlässiger ÖPNV bildet das
    Herzstück einer erfolgreichen Verkehrswende. Neben der Pünktlichkeit von
    Zügen und Bussen ist die Gewährleistung der vorgesehenen Anschlüsse  ein
    ganz wichtiger Punkt, der das Vertrauen der Reisenden in den ÖPNV prägt.
  title: Anschlusssicherung als wichtiger Baustein für Qualität im ÖPNV
  sections:
    - orientation: column
      title: Knappe Ressourcen – ein Hindernis für verlässliche Reisendeninformation
      text: Leider sind die Leitstellen der Eisenbahnverkehrsunternehmen in
        Deutschland heute sehr ausgelastet und konzentrieren sich daher im
        Störungsfall vorrangig auf betriebliche Abläufe. Die Zeit für die
        umfassende Reisendeninformation und die Sicherung von Reiseketten fehlt
        dann meist. Die Lage hat sich in den vergangenen Jahren verschlechtert,
        da die DB Netz AG als Betreiberin des Schienennetzes ihre bisherige
        Aufgabe aufgegeben hat, die Anschlusssicherung zwischen den Zügen zu
        koordinieren – eine Praxis, die über ein Jahrhundert hinweg
        selbstverständlich war. Die Abstimmung zwischen den Leitstellen der
        einzelnen Unternehmen gestaltet sich dadurch erheblich komplexer und ist
        bislang nicht flächendeckend umgesetzt. Infolgedessen ist die
        Sicherstellung von Anschlüssen heute vielfach nicht mehr gewährleistet,
        und die Belange der Fahrgäste geraten zunehmend aus dem Blickfeld.
    - orientation: row
      title: Digitale Assistenten unterstützen das Personal
      text: >-
        Die NVBW als Servicegesellschaft des Verkehrsministeriums
        Baden-Württemberg hat uns daher beauftragt, ein unternehmensübergreifend
        nutzbares, integriertes System zur Anschlusssicherung zu entwickeln.


        Das System besteht einerseits aus einer Web-Anwendung, die den Leitstellen aller Unternehmen zur Verfügung gestellt wird. Andererseits umfasst das System eine App für die Fahrzeuge, die den Fahrzeugführer:innen anzeigt, ob und wie lange sie warten müssen, um den Anschluss von einem verspäteten Zubringer zu gewährleisten. Beide Anwendungen sind als Open Source-Software entwickelt. Sie werden über die NVBW allen Unternehmen kostenfrei zur Verfügung gestellt.


        Im Hintergrund verarbeitet das System Fahrplan-Solldaten und Echtzeitdaten. Aus den Solldaten werden die vorgesehenen Anschlüsse hergeleitet, wobei auch die Umsteigezeiten zwischen zwei Fahrten berücksichtigt werden. Mit den Echtzeitdaten werden dann die Hinweise erstellt, wie lange auf Zubringer gewartet werden soll. Die Web-Anwendung informiert die Leitstelle sehr detailliert darüber, welche Anschlüsse gesichert werden oder welche wegen zu grossen zeitlichen Differenzen gebrochen werden müssen. In der App für die Fahrzeugführer:innen werden die Wartezeiten ohne weitere Details gezeigt, um jegliche unnötige Ablenkung zu vermeiden.
      image: /images/cases/nvbw-connection-protection/nvbw-mobile.png
    - orientation: column
      title: "Die technische Basis: TRALIS als Datendrehscheibe"
      text: Für die Verarbeitung und Analyse von Soll- und Echtzeitdaten kommt unsere
        Datendrehscheibe TRALIS zum Einsatz. TRALIS ist optimiert dafür, auch
        grosse Datenmengen zu integrieren, mit minimalen Latenzen zu analysieren
        und wieder an die Abnehmersysteme auszugeben. App und WebApp werden mit
        spezialisierten WebSocket- und REST-Schnittstellen mit den Daten aus
        TRALIS versorgt (auf Standard-Schnittstellen wie VDV 453 wurde für die
        Kommunikation innerhalb des Systems aus Gründen der Performanz
        verzichtet). Der Betrieb des Backends erfolgt auf klassischen
        Mietservern, wobei das automatisierte Deployment bei Bedarf auch
        kurzfristige horizontale Skalierungen erlaubt.
    - orientation: column
      title: "Blick nach vorn: von der Pilotphase zum produktiven Einsatz"
      text: Derzeit finden sich beide Tools in der Pilotphase. Schon jetzt geplant
        sind verschiedene, kleine Optimierungen wie die differenziertere
        Berücksichtigung von Umsteigezeiten. Vor allem aber sollen
        Schnittstellen zu den ITCS der Unternehmen etabliert werden, so dass die
        Anschlusssicherung direkt in der Disposition verfügbar ist. Noch ist der
        Einsatz auf Eisenbahnverkehrsunternehmen (EVU) beschränkt, eine
        Ausweitung auf andere Verkehrsmittel ist jedoch schon vorgesehen. Ob der
        aktuelle, deterministische Ansatz für die Empfehlung von Wartezeiten
        langfristig ausreicht, muss sich noch zeigen. Möglicherweise müssen
        Simulationen verschiedener Szenarien ergänzt werden, um für möglichst
        viele Reisende das schnelle und sichere Erreichen ihrer Ziele zu
        ermöglichen.
testimonials:
  - text: Mit den beiden Anwendungen können wir den Personalen sowohl in den
      Leitstellen als auch auf den Zügen zielgerichtet die nötigen Informationen
      zu Anschlüssen zukommen lassen. Die Anwendungen sind in einer sehr
      gelungenen, übersichtlichen Optik gestaltet, die bei Nutzern gut ankommt
      und zeigt, dass bei der Entwicklung der Blick der Anwender eine zentrale
      Rolle spielte. Darüber hinaus haben wir bereits Weiterentwicklungen wie
      gleisscharfe Umsteigezeiten oder die Aufnahme weiterer Verkehrsmittel in
      Aussicht.
    name: Marius Welle
    position: Qualitätsmanagement, NVBW
    portrait: /images/cases/nvbw-connection-protection/marius.png
---
