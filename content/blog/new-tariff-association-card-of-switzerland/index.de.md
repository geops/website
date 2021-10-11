---
title: Die neue Tarifverbundkarte der Schweiz
summary: Die Schweiz bildet eine komplexe Landschaft vieler Tarif- und
  Verkehrsverbunde. Auf welcher Strecke gilt welches Abo? Und behält es seine
  Gültigkeit auch über die Kantonsgrenze hinaus? Oder braucht es doch ein
  Einzelbillett? Da kann man ganz schön leicht den Überblick verlieren. Mit der
  Tarifverbundkarte zeigen wir alle Verbunde der Schweiz und schaffen die
  Möglichkeit, in diesem öV-Dschungel die Orientierung zu behalten.
created: 2021-10-06
slug: neue-tarifverbundkarte-der-schweiz
---
Die Schweiz bildet eine komplexe Landschaft vieler Tarif- und Verkehrsverbunde. Auf welcher Strecke gilt welches Abo? Und behält es seine Gültigkeit auch über die Kantonsgrenze hinaus? Oder braucht es doch ein Einzelbillett? Da kann man ganz schön leicht den Überblick verlieren. Mit der Tarifverbundkarte zeigen wir alle Verbunde der Schweiz und schaffen die Möglichkeit, in diesem öV-Dschungel die Orientierung zu behalten.

## Der Hintergrund

Im Rahmen der [Trafimage-Systematik der SBB](https://www.sbb.ch/de/bahnhof-services/am-bahnhof/bahnhoefe/karten-bahnhofplaene.html) und im Auftrag der SBB und des [Verbands öffentlicher Verkehrsunternehmen VöV](https://www.voev.ch/) wurde schon seit mehr als zehn Jahren die [Übersicht der Tarifverbunde](https://maps.trafimage.ch/ch.sbb.tarifverbundkarte.public) als Karte publiziert und jedes Jahr manuell aktualisiert. Anfang 2021 erhielt die bisherige Karte ein umfassendes Update: Neben einem sanften Facelift sind es vor allem technische Neuerungen, die das Datenupdate automatisieren, Web- und Printversion der Karte vereinheitlichen und den Informationsgehalt der Webversion erhöhen.

![](/images/blog/die-neue-tarifverbundkarte-der-schweiz/tarifverbundkarte_01.png)

### Die Datenbank NOVA als Grundlage

Die neue Tarifverbundkarte basiert nicht mehr auf persönlichen, informellen Inputs und deren manueller Einarbeitung in eine Grafik-Software. Vielmehr setzen wir jetzt NOVA ein, eine zentrale Datenbank mit umfassenden Tarifinformationen, die im Rahmen der Initiative für das «Zukünftige Preissystem öV Schweiz» ZPS entwickelt wurde. Wir nutzen NOVA bereits seit mehreren Jahren, um für die Verkaufsapplikation CASA, die an SBB-Schaltern verwendet wird, einen Kartenlayer mit den Grenzen aller Tarifzonen der Schweiz zu erstellen. Die Zonen werden immer routinemässig zum Fahrplanwechsel auf Basis der Information zur Gültigkeit von Abo-Produkten berechnet. Diese ist in NOVA für jede Verbindung (sogenannte «Kanten») und jeden Betreiber hinterlegt. Was läge da näher als diese Daten auch als Grundlage für die neue Tarifverbundkarte zu nutzen?

### Die Verarbeitungsschritte

In der Tarifverbundkarte ist die Ausdehnung der Verbunde auf Gemeindebasis dargestellt. Obwohl sich die Verbunde in der Realität keineswegs immer an administrativen Grenzen orientieren, hat sich diese Vereinfachung als eine Form der kartografischen Generalisierung im Hinblick auf die die Übersichtlichkeit der Karte für die ganze Schweiz oder grössere Teilregionen als vorteilhaft erwiesen. Vor der Zuweisung eines Verbundes zu einer Gemeinde sind allerdings noch diverse Prozessierungsschritte erforderlich, die allesamt im Algorithmus zur automatisierten Kartenerstellung implementiert sind: Die Kanteninformationen in NOVA sind räumlich noch nicht genau genug für die Kartenerstellung und müssen daher zuerst mit unseren Routing-Diensten in geografisch exakte Streckenverläufe umgewandelt werden. Der Algorithmus berücksichtigt sodann eine manuell erstellte Liste von Regeln, mit denen wichtige Ausnahmen der Abo-Gültigkeiten innerhalb einer Gemeinde dargestellt werden. So ist es zum Beispiel möglich, für die Zahnradbahn nach Les Pléiades anzuzeigen, dass sie eben nicht mit dem mobilis-Abo befahren werden darf, so wie es für den Rest der Gemeinde Blonay gilt. Zuletzt müssen auch noch Überlappungen zwischen Verbunden erkannt werden, um diese Bereiche mit einer Schraffur aus den Farben der involvierten Verbunde zu markieren.

Die fertig berechneten Grenzen der Verbunde werden aus der Datenbank für die Darstellung in Webkarten exportiert. Dabei kommen MapBox Vector Tiles zum Einsatz, eine moderne Technologie, die hochauflösende Darstellungen und weitreichende Interaktivität mit der Karte ermöglicht und gleichzeitig die Datenmenge, die der Webbrowser über das Internet laden muss, gering hält.

<img class="hidden md:block" src="/images/blog/die-neue-tarifverbundkarte-der-schweiz/tarifverbundkarte_zusammengefügt.png">

<img class="block md:hidden" src="/images/blog/die-neue-tarifverbundkarte-der-schweiz/tarifverbundkarte_title.png">

### Print is not dead

Dank der technologischen Umstellung der Datenaufbereitung konnten die Möglichkeiten der Webkarte deutlich erweitert werden. Bei Klick in die Karte werden nicht nur die Gemeinde und die Verbunde am angeklickten Punkt gezeigt, sondern der Benutzer sieht auch, welche Tarifzonen sich an dem Punkt befinden. Ein weiteres Highlight der Webkarte ist, dass sie gleichzeitig die Grundlage für den Druck in verschiedenen Formaten bis zu A0 darstellt. Während die Webkarte und die gedruckte Version früher zwei getrennte Produkte waren, kann jetzt ganz einfach direkt aus dem Web ein PDF mit Legende erzeugt werden. Die Frage, ob es in der digitalen Zeit überhaupt noch eine gedruckte Karte braucht, ist somit hinfällig. Wer will erstellt sich seinen Druck einfach selbst.

### Ausblick

Insgesamt ist an der Tarifverbundkarte fast alles neu. Die technischen Aktualisierungen ermöglichen es uns, mit einer automatisierten, performanten Kartenproduktion weiterhin für Überblick im öV-Dschungel zu sorgen. Der neue Ansatz spart nicht nur Kosten, sondern verbessert auch die Aktualität der Karte und reduziert das Risiko von Fehlern. Für die Zukunft planen wir, weiteren Nutzen aus den NOVA Daten zu ziehen – vielleicht gibt es bald eine Webkarte, die differenziert für jede Strecke nicht nur die Gültigkeit von Verbundabos sondern auch der übergreifenden Produkte wie GA oder Halbtax zeigt. Schauen Sie regelmässig in unseren Blog oder abonnieren Sie gleich unseren [Newsletter](https://geops.ch/newsletter), damit Sie immer auf dem Laufenden bleiben.