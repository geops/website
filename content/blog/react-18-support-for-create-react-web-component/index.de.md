---
title: React 18 Unterstützung für create-react-web-component
summary: Wir wollten 5 Jahre alte Abhängigkeiten des trafimage-maps Projekts
  aktualisieren. Aber es scheint, dass ein Projekt veraltet ist. Was sollen wir
  tun? das Projekt reparieren oder etwas anderes verwenden? Wir entscheiden uns,
  das Projekt zu fixen und der Gemeinschaft etwas zurückzugeben.
created: 2023-12-19
slug: react-18-unterstutzung-fur-create-react-web-component
published: true
---
Vor fünf Jahren beschlossen wir, die React-Anwendung [maps.trafimage.ch](https:maps.trafimage.ch) (siehe Projekt auf [github](https://github.com/geops/trafimage-maps)) in eine Webkomponente umzuwandeln, um die Integration in eine Angular-App und andere Nicht-React-Umgebungen zu erleichtern. 

Zu dieser Zeit gab es nicht viele Bibliotheken, die das konnten, eine davon war 
[create-react-web-component](https://www.npmjs.com/package/create-react-web-component), vielen Dank an [SimonHoiberg](https://github.com/SimonHoiberg) für diese Bibliothek.

Sie war so einfach zu benutzen, dass wir sie behalten haben.

Fünf Jahre sind eine lange Zeit in der Welt von JavaScript, und aus verschiedenen Gründen (meist Abhängigkeiten zwischen Paketen und/oder Unterstützung von Node-Versionen) haben wir nicht auf die letzten großen Abhängigkeiten wie Node, OpenLayers, React und Material UI aktualisiert.

Aber es war Zeit, Zeit für ein großes Update von Dutzenden von Hauptversionen, die alle auf einmal zu aktualisieren.

Es scheint ziemlich gut zu funktionieren, alle Librairies arbeiten mit React 18, es dauert natürlich ein paar Tage, aber abgesehen von Transpilationsproblemen und der Aktualisierung der Testlibrairies funktioniert alles wie erwartet.

Bis ein großes Problem auftaucht:

![github project archived and deprecated](/images/blog/react-18-support-for-create-react-web-component/github-deprecated.png "github project archived and deprecated")

Das Github-Projekt von create-react-web-component ist archiviert und das npm-Paket ist veraltet. Mein Albtraum als OpenSource Entwickler wird wahr.

![developer nightmare](/images/blog/react-18-support-for-create-react-web-component/dev-nightmare.gif "developer nightmare")

Das Paket ist für React 16 blockiert. Ich hoffte, dass jemand das Projekt gegabelt und es behoben, aber nein. Also 2 Möglichkeiten, finden Sie ein anderes Paket, das die gleiche Sache tut oder meine Hand schmutzig und beheben Sie das Projekt von meinem eigenen.

Nach einigen Recherchen gibt es viel mehr Projekte als noch vor 5 Jahren, die das Gleiche tun. Aber keines davon macht genau das, was create-react-web-component macht, d.h. nicht serialisierbare Objekte so einfach zu übergeben. Nach ein paar Stunden des Testens gab ich auf und beschloss, dass die Fixierung von create-rect-web-component die beste Lösung war und ich mochte auch die Herausforderung.

Seit 5 Jahren habe ich viel mehr Erfahrung im Umgang mit Web-Komponenten. Ich wusste auch, dass React 18 eine neue Render-Funktion eingeführt hat, und das war wahrscheinlich das Problem.

Also habe ich das Projekt auf geOps github repository (https://github.com/geops/create-react-web-component) geforkt. Und es scheint so einfach zu sein, wie es sich anhört.

Die Umwandlung einer React-Komponente in eine Web-Komponente ist nicht so kompliziert. Ich hätte die 2 Klassen in das trafimage-maps Projekt kopieren/einfügen können, aber naja, wozu OpenSource verwenden, wenn man nie etwas zurückgibt.

![this the way](/images/blog/react-18-support-for-create-react-web-component/this-is-the-way.webp "this is the way")

Als Bonus habe ich den ganzen CRA cli Kram und poylfill entfernt. Das macht das Projekt einfacher zu verwalten. Jetzt ist das Benutzerprojekt dafür verantwortlich, es zu transpilieren und poylfill hinzuzufügen, falls erforderlich.

Das geOps-Team freut sich, Ihnen mitteilen zu können, dass wir eine neue Paketversion von create-react-web-component veröffentlicht haben, die React 18 unter dem Namen [@geops/create-react-web-component](https://www.npmjs.com/package/@geops/create-react-web-component) unterstützt

Frohe Weihnachten!!!