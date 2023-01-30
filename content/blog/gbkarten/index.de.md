---
title: Karte der Abo-Geltungsbereiche
summary: "Die Karte der Geltungsbereiche von Generalabo, Halbtax und weiteren
  Abos im öV Schweiz ist jetzt als echte digitale Version verfügbar. Die bislang
  manuell gepflegte Karte, die als PDF oder gedruckte Faltkarte produziert
  wurde, wurde durch eine automatisch erstellte, dynamische Webkarte abgelöst. "
created: 2023-01-29
slug: gbkarten
frontpage: true
published: true
---
## Hintergrund

Als Zug-Vielfahrer geniesse ich nicht nur die finanziellen Vorteile des Schweizer Generalabonnements sondern auch die Unbeschwertheit, die es mir beim Reisen bietet. Ohne Billetkauf einfach einsteigen und losfahren ist wunderbar bequem. Diese Art des Reisens funktioniert auf allen von mir regelmässig genutzten Strecken, beispielsweise auf dem Weg ins Büro oder zu Kunden. Aber wie sieht es aus, wenn ich in den Ferien oder an Wochenenden einen Ausflug in abgelegenere Ecken der Schweiz plane? Gilt das GA für den Bus, der mich am Wochenende zum Hotel Chasseral bringt? Oder darf ich gratis mit der Gondel auf den Brambrüesch fahren? Wenn man schon ein GA hat, möchte man es natürlich auch in der Freizeit für kostenloses Reisen nutzen. Doch das Generalabonemment gilt eben gerade für die kleinen Strecken keineswegs generell. 

![Brambrüesch](/images/blog/digitale-geltungsbereichskarten/gb3.jpg)

*Mit dem Generalabonnement können viele Bergbahnen gratis genutzt werden. Bei der Fahrt auf den Brambrüesch bei Chur gibt es immerhin 50 % Ermässigung. Foto: Lino Schmid via Wikimedia Commons.*

Damit Reisende schon bei der Planung einer Reise die Gültigkeit des GA ebenso wie die Gültigkeit anderer Abonnements berücksichtigen können, produziert die SBB seit rund 20 Jahren die sogenannten Geltungsbereichskarten. In akribischer Handarbeit mit hohem Qualitätsanspruch wurden diese Karten, auf denen so viel Information wie möglich abgebildet wurde, gepflegt. Publiziert als PDF oder in Form handlich zusammenfaltbarer Druckkarten bildeten sie eine wichtige Informationsquelle im öffentlichen Verkehr der Schweiz. Und tatsächlich, die Geltungsbereichskarten sagen mir, dass ich bei der Fahrt auf den Brambrüesch mit dem GA wenn schon keine freie Fahrt so doch immerhin eine Ermässigung erhalte. Auch beim Chasseral kann ich mir bei genauem Hinsehen noch vorstellen, dass mein GA irgendwo da oben Gültigkeit hat. Aber ist die Abzweigung vom Col bis zum Hotel auch enthalten oder nicht? Bei solchen Details kamen die statischen Karten dann doch an ihre Grenzen. 

Der Wunsch, noch mehr Details auf den Karten abzubilden, war einer der Treiber für unser Projekt der digitalen Geltungsbereichskarten. Dazu kam, dass eine PDF-Karte den Ansprüchen an digitale Informationsvermittlung nicht mehr genügte. Heute ist es selbstverständlich, dass eine digitale Karte einfach verschoben und gezoomt werden kann, und dass Informationen durch Anklicken der Karte abgefragt werden können. Diese Möglichkeiten müssen auf einem grossen Bildschirm genauso wie auf Tablet und Smartphone verfügbar sein. Mit einem PDF geht das alles nicht. Vielleicht der wichtigste Grund, warum die bisherigen Karten und die damit zusammenhängende manuelle Pflege der Inhalte abgelöst werden sollte, war die Tatsache, dass die Informationen zu den Geltungsbereichen in anderen Datenbanken bereits vorhanden waren, wo sie als Basis für die Tarifierung und die Billetverkäufe genutzt wurden, und wo daher bereits viel Energie in deren laufende Aktualisierung investiert wurde. Was lag also näher, als diese Datenbanken auch für eine automatisierte Produktion der Geltungsbereichskarten zu verwenden?

## Das Projekt

Wer andere Lösungen von geOps kennt, kann sich schon denken, welche Datenbanken wir für die Produktion der Geltungsbereichskarten verwenden. Es handelt sich um NOVA. 

![Tarifverbundkarte](/images/blog/digitale-geltungsbereichskarten/gb2.png)

*Mit den Daten aus NOVA hatten wir bereits die schweizweite Berechnung von Tarifzonengrenzen sowie die Erstellung der Tarifverbundkarte realisiert.*

NOVA deckt sämtliche tarifarischen Anwendungen von der Preisabfrage über den Verkauf und der Kontrolle ab. Über Schnittstellen können Transportunternehmen ihre Auskunftssysteme mit NOVA verknüpfen. Neben vielen anderen Tarifinformationen ist auch für jede Linie (und jeden Betreiber) hinterlegt, welche Abo-Produkte vollständig gültig sind oder eine Ermässigung bringen. In einem Projekt mit Alliance Swiss Pass konnten wir die Anbindung von NOVA an die Daten des öV-Netzes der Schweiz realisieren. Neben Alliance Swiss Pass war bei der Realisierung eine Begleitgruppe aus Vertreter:innen zahlreicher Transportunternehmen beteiligt.

## Die Lösung

Sämtliche Informationen in NOVA sind an sogenannte Tarifkanten gebunden. Eine Kante ist über die Knoten, also die Haltestellen, am Anfang und am Ende definiert. Bei nicht eindeutigen Verläufen sind zusätzliche Zwischenknoten in Form echter Haltestellen oder von Pseudostationen, einfachen Punkten auf der Strecke angegeben. Für eine Fahrt von Olten nach Bern über die Neubaustrecke sind zum Beispiel Olten und Bern die Start- und Endknoten und, um den Fahrtverlauf eindeutig zu definieren, noch Bahn2000 als Zwischenknoten angegeben. Als tarifarische Information, die wir für die Geltungsbereichskarten nutzen, ist an diesen Kanten hinterlegt, ob GA, Halbtax, seven25 oder diverse weitere Abos ganz oder teilweise gültig sind. Bedingt durch die Modellierung sind Kanten zuerst einmal nur gerade Verbindungslinien zwischen den Knoten. Um daraus eine genaue kartographische Darstellung zu erhalten, sind einige Schritte erforderlich. 

Zuerst einmal wird ein topologisch und geographisch korrektes Netz aller Verkehrsmittel des öV benötigt. Wir pflegen ein solches Netz im Rahmen unserer Arbeiten für Trafimage der SBB. Das Netz enthält die genauen Linienverläufe für alle Verkehrsmittel in verschiedenen Generalisierungsstufen, also mit Eignung für verschiedene Kartenmassstäbe. Im Netz enthalten sind die gleichen Knoten bzw. Haltestellen, die auch NOVA nutzt. Zumindest sind es weitgehend die gleichen, denn leider gibt es immer noch ab und zu Unterschiede, mit welchen Nummern verschiedene Systeme eine Haltestelle identifizieren.

Als zweite Komponente wird ein Routing-Engine benötigt, der mit der Angabe von zwei oder drei Knoten den geographischen Verlauf der kompletten Linie bestimmen kann. Der Routing-Engine wird von uns ebenfalls schon lange weiterentwickelt und kommt für zahlreiche Anwendungen zum Einsatz.

Mit diesen Komponenten können theoretisch die tarifarischen Informationen abgebildet werden. So zumindest die Theorie. In der Praxis zeigen sich noch zahlreiche Problemfälle, die durch Sonderlösungen oder Heuristiken abgefangen werden müssen. Die schon erwähnten abweichenden Stationsnummern sind ein Beispiel. Besondere Verbindungen wie Flughafenbusse oder Verbindungen im Ausland, die zwar tarifarisch korrekt sind aber auf einer Karte nur für Verwirrung sorgen und daher ausgefiltert werden müssen, sind ein anderes. Nicht zuletzt dank der intensiven Unterstützung der beteiligten Transportunternehmen konnten die meisten der Probleme gelöst werden. 

![Geltungsbereiche in der Jungfrauregion](/images/blog/digitale-geltungsbereichskarten/gb1.jpg)

*Im Bereich der Jungfraubahnen zeigt die Geltungsbereichskarte sehr detailliert, wo das GA ganz, teilweise oder gar nicht gültig ist.*

Am Schluss blieben nur wenige Konstellationen, die nicht oder noch nicht gelöst sind, und wo die Karte somit keine vollständige Information anzeigt. Ein Beispiel dafür sind die Sportbusse in manchen Wintersportgebieten. Da diese Busse per se gratis sind, war in NOVA nie klar definiert, ob auf diesen Bussen das GA nun als gültig erfasst wird oder nicht. Man hat sich in diesem Fall entschieden, die Daten so zu nehmen wie sie sind und damit auch unterschiedliche Darstellungen zwischen einzelnen Gemeinden in Kauf zu nehmen. Ein anderes Beispiel ist die Schifffahrt auf dem Bodensee. Dies ist die einzige Region, in der die Gültigkeit eines Abos von der Richtung abhängt, in der eine Kante befahren wird. Während das GA bei der Fahrt von der Insel Mainau nach Meersburg gültig ist, wird auf der Fahrt in die andere Richtung der volle Fahrtpreis fällig, und dies wohlgemerkt bei ein und demselben Betreiber der Linie. Vor einem so geringen Mass an Systematik mussten IT und Kartographie kapitulieren. Für den Bodensee zeigen wir daher nur graue Linien und den Hinweis, dass die Gültigkeit vor Ort erfragt werden muss (oder alternativ per Faxgerät).

## Ausblick

Bis auf einige wenige Ausnahmen zeigt die Geltungsbereichskarte im aktuellen Stand die Gültigkeit der verschiedenen Abos für die Strecken in der Schweiz korrekt und sehr detailliert. 
Künftige Updates werden voraussichtlich auch die letzten Ungenauigkeiten noch beseitigen.  Bei der SBB ist die Karte bereits an mehreren Stellen in den [Webauftritt](https://www.sbb.ch/de/abos-billette/abonnemente/ga/ga-geltungsbereich.html) integriert. Im [Webkartenportal von Trafimage](https://maps.trafimage.ch/ch.sbb.geltungsbereiche) ist die Karte eigenständig verfügbar. Bei dieser Variante ist die Funktion zur Suche nach Haltestellen und anderen Orten besonders praktisch. Andere Transportunternehmen können die Karte über eine Programmierschnittstelle ebenfalls kostenlos nutzen. Mit dem System, tarifarische Informationen aus NOVA auf das Streckennetz abzubilden, besteht auch eine gute Grundlage für weitere Anwendungen. Eine Karte für die Abos von [Swiss Travel System](https://www.mystsnet.com/) ist bereits in Vorbereitung. Unternehmen, die die Karte auf ihrer Website nutzten wollen, könen dazu die [hier dokumentierte](https://jsdoc.maps.trafimage.ch/) Programmierschnittstelle verwenden.