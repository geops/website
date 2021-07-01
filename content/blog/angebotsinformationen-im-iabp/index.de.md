---
title: Angebotsinformationen im IABP
summary: geOps entwickelt für die Schweizerischen Bundesbahnen (SBB) im Rahmen
  des Trafimage-Mandats den Interaktiven Bahnhofplan (IABP). Dieser hilft als
  eigenständige Anwendung oder als eingebundener Lageplan auf sbb.ch Kunden der
  SBB bei der Orientierung im und am Bahnhof.
slug: angebotsinformationen-im-iabp
---
[![Lageplan](/images/blog/angebotsinformationen-im-iabp/Lageplan_SBBCH_0_0.png)](https://plans.trafimage.ch/bern)

#### Neuerungen des IABP

Bisher lag der Fokus des [Interaktiven Bahnhofplans](https://plans.trafimage.ch/bern) vor allem auf dem Finden von Angeboten. Für weiterführende Informationen, wie Öffnungszeiten, akzeptierte Zahlungsmittel und Kontaktinformationen, mussten Nutzer die verlinkte SBB-Webseite öffnen.

In der neuen Version des IABP werden bei einem Klick auf ein Angebot alle relevanten Informationen übersichtlich in einem Overlay angezeigt. Die angezeigten Informationen kommen sowohl auf [sbb.ch](https://www.sbb.ch/de/bahnhof-services/am-bahnhof/bahnhoefe/bahnhof-bern/geschaefte/shop-detail.html/geo-migros-e50c) als auch im interaktiven Plan aus dem von geOps entwickelten "GeoCMS Bahnhofpläne" Die Angebotsinformationen werden dort von den SBB und der Branding- und Design-Agentur [evoq](https://evoq.ch) verwaltet und stets aktuell gehalten.

![IABP Update](/images/blog/angebotsinformationen-im-iabp/IABP_UPDATE_0_0.png)

Auch bei der Filterung der Angebote, beim Menü und bei der Umschaltung zwischen Innen- und Aussenplan wurden zahlreiche Verbesserungen vorgenommen.

#### Technologie

Technologisch ist der IABP auf dem neuesten Stand: Als Kerntechnolgien verwenden wir die JavaScript-Library [React](https://reactjs.org/ "Verknüpfung folgen") und die Kartenbibliothek [OpenLayers](https://openlayers.org/ "Verknüpfung folgen"). Natürlich ist auch das neue Overlay voll responsiv und stellt auf Desktop, auf Mobile und auf sbb.ch alle relevanten Informationen übersichtlich dar.