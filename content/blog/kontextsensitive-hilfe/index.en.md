---
title: Kontextsensitive Hilfe
summary: geOps veröffentlicht flexibles jQuery-Plugin für kontextsensitive Hilfe
  in Webanwendungen.
author: Friedjoff Trautwein
created: 2011-02-04
slug: kontextsensitive-hilfe
tags:
  - developers
published: false
---

**Code steht noch nicht auf github. Lokal unter https://ssl.geops.de/svn/altlast/trunk/apps/altlast4web/public/js/Geops/jquery.help.js verfügbar und bereit für die Publikation. Außer dem Code des Plugins sollte noch eine Demo Seite (mittels http://pages.github.com/) auf github gestellt werden.**

Bei der Erstellung einer umfangreichen Applikation stellen sich die Fragen wie die Hilfe zu pflegen und dem Benutzer anzubieten ist. Auf Grund der Möglichkeit bestehende Systeme zu nutzen und das Rad nicht neu zu erfinden, bietet es sich an einen externen Dienst für die Hilfe anzubinden. Im einfachsten Fall ist dieser externe Dienst eine simple Website mit statischen Inhalten. Weitergehende Möglichkeiten bietet die Verwaltung der Hilfetext in bestehenden [CMS](http://de.wikipedia.org/wiki/Content-Management-System "Wikipedia-Artikel zu Content-Management-Systemen") oder Wikis. Bleibt die Frage wie die Verknüpfung der eigenen Applikation mit der externen Datenquelle hergestellt wird.

Wenn die Applikation zu der Hilfe angeboten werden soll eine Website ist, bietet es sich an Links auf Hilfetext an geeigneter Stelle unterzubringen. Dies hat jedoch zur Folge, dass die Hilfelinks immer Platz beanspruchen und das Layout beeinflussen. Zudem muss beachtet werden, dass der Benutzer beim Aufruf der Hilfe die aktuelle Seite verlässt und damit noch nicht gespeicherte Daten verliert.

Ein eleganterer und wartungsfreundlicherer Ansatz ist es, einzelne Teile der Seite mit unsichtbaren Referenzen auf die Hilfe zu versehen. Nachdem ein Benutzer seinen Wunsch ausgedrückt hat, die Hilfe zu nutzen, können dann clientseitig Hilfetexte in Abhängigkeit des Kontexts angeboten werden.

Icons für das Aufrufen der Hilfe werden als Overlay über den Anwendungsteilen angezeigt. Die Hilfe erscheint damit direkt beim beschreibenen Anwenungsteil. In der fertigen Anwendung sieht dies dann so aus:  
![](/images/blog/kontextsensitive-hilfe/aufruf.png)

Ein Skript, realisiert als jQuery-Plugin, blendet Hilfe-Links (blaues Symbol) ein sobald der Benutzer die Maus über das erklärenswerte Objekt bewegt. Ein Klick auf den Hilfe-Link lädt dann den Hilfetext und präsentiert ihn dem Benutzer:  
![](/images/blog/kontextsensitive-hilfe/anzeige.png)

Übrigens lässt sich der Hilfetext, so gewünscht, vom Benutzer verändern. So können Benutzergruppen oder der Support einfach Hilfetexte erstellen, die auf die Bedürfnisse von Benutzergruppen zugeschnitten sind.

Das [jQuery-Plugin](https://github.com/geops/jquery-plugins/help "Code-Repository des Hilfesystems"), das geOps für die Darstellung der Hilfetext entwickelt hat, stellen wir auf [GitHub](https://github.com/geops/jquery-plugins/help "Code-Repository des Hilfesystems") zur Verfügung.  Intern verwendet das Plugin [HTML5-Data-Attribute](http://dev.w3.org/html5/spec/elements.html#embedding-custom-non-visible-data-with-the-data-attributes), deren Vorteile John Resig in [seinem Blog](http://ejohn.org/blog/html-5-data-attributes/) grob umreißt. Das `data-help`\-Attribut stellt die Verknüpfung eines Seitenelements zum Hilfetext her, das Plugin kümmert sich um die Darstellung – außer dem spezifizieren des Attributs und einem Aufruf des Plugins an zentraler Stelle braucht nichts an Ihrer Anwendung verändert zu werden. Die Pflege der Hilfetext kann in bekannten Systemen, beispielsweise im firmeneigenen Wiki, erfolgen.

Die Verwendung des Plugins erlaubt also bestehende Webanwendungen oder normale Websites mit einem Hilfesystem auszustatten. Aufwand für Implementation und Wartung beschränken sich hierbei auf ein Minimum.
