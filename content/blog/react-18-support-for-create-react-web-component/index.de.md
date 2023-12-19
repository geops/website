---
title: React 18 Unterstützung für create-react-web-component
summary: Wir wollen fünf Jahre alte Abhängigkeiten des Projekts trafimage-maps
  aktualisieren. Aber es scheint, dass eine Projektabhängigkeit veraltet ist.
  Was sollen wir tun? Das Projekt reparieren oder etwas anderes verwenden? Wir
  haben uns entschieden, das Projekt zu reparieren und der Gemeinschaft etwas
  zurückzugeben.
created: 2023-12-19
slug: react-18-unterstuetzung-fuer-create-react-web-component
published: true
---
Vor fünf Jahren beschlossen wir, die React-Anwendung [maps.trafimage.ch](https://maps.trafimage.ch) (siehe Projekt auf [github](https://github.com/geops/trafimage-maps)) in eine Webkomponente umzuwandeln, um die Integration in eine Angular-App und andere Nicht-React-Umgebungen zu erleichtern. 

Zu dieser Zeit gab es nicht viele Bibliotheken, die das konnten, eine davon war 
[create-react-web-component](https://www.npmjs.com/package/create-react-web-component), vielen Dank an [SimonHoiberg](https://github.com/SimonHoiberg) für diese Bibliothek. Sie war so einfach zu benutzen, dass wir sie behalten haben.

Fünf Jahre sind eine lange Zeit in der Welt von JavaScript, aber aus verschiedenen Gründen (meist Abhängigkeiten zwischen Paketen und/oder Unterstützung von Node-Versionen) hatten wir große Abhängigkeiten wie Node, OpenLayers, React und Material UI nicht auf ihre letzten major-Versionen aktualisiert.

Doch nun war die Zeit gekommen, sich dem Unvermeidlichen zu stellen. Wir beschlossen, ein Dutzend major-Versionen auf einem Schlag zu aktualisieren.

Zu unserer Überraschung verliefen die Updates größtenteils reibungslos, da sich alle Bibliotheken als kompatibel mit React 18 erwiesen. Nach einigen kleineren Transpilierungsproblemen und der Überarbeitung der Testumgebung funktionierte alles wie erwartet.

Bis ein großes Problem auftauchte:

![github project archived and deprecated](/images/blog/react-18-support-for-create-react-web-component/github-deprecated.png "github project archived and deprecated")

Das Github-Projekt von create-react-web-component ist archiviert und das npm-Paket ist veraltet. Mein Albtraum als OpenSource Entwickler wurde wahr.

![developer nightmare](/images/blog/react-18-support-for-create-react-web-component/dev-nightmare.gif "developer nightmare")

Das Paket ist nur bis React 16 kompatibel. Ich hoffte, dass jemand das Projekt geforked und es behoben hatte, aber leider kein Glück. Es blieben also zwei Möglichkeiten: ein anderes Paket finden, welches das Gleiche tut, oder mir die Hände schmutzig machen und das Projekt selbst reparieren.

Nach einigen Recherchen habe ich herausgefunden, dass es viel mehr Projekte gibt als noch vor fünf Jahren, die React-Web-Komponenten erstellen, aber keines von ihnen macht genau das, was create-react-web-component macht. Insbesondere ist keines von ihnen in der Lage, nicht-serialisierbare Objekte auf so einfache Weise zu übergeben.

Nach einigen Stunden des Ausprobierens gab ich auf und beschloss, dass die Reparatur von create-rect-web-component die beste Lösung war. Ich sah es als eine Herausforderung an und war begeistert, einen Weg zu finden, es zum Laufen zu bringen.

Im Gegensatz zu vor fünf Jahren habe ich jetzt viel mehr Erfahrung mit Web-Komponenten. Ich wusste auch, dass mit React 18 eine neue Render-Funktion eingeführt wurde, von der ich annahm, dass sie das Problem war.

Also habe ich das Projekt auf dem [geOps github repository](https://github.com/geops/create-react-web-component) geforkt und angefangen zu programmieren. Und es stellte sich heraus, dass es so einfach war, wie ich gehofft hatte.

Die Umwandlung einer React-Komponente in eine Web-Komponente ist nicht so kompliziert. Ich hätte meine Code-Updates in das trafimage-maps-Projekt kopieren können, aber was nützt es, OpenSource zu verwenden, wenn man nie etwas zurückgibt.

![this the way](/images/blog/react-18-support-for-create-react-web-component/this-is-the-way.webp "this is the way")

Als Bonus habe ich den ganzen CRA cli Kram und poylfill entfernt. Dadurch wird das Projekt leichter zu verwalten sein. Jetzt ist das Benutzerprojekt dafür verantwortlich, es zu transpilieren und bei Bedarf den poylfill hinzuzufügen.

Das geOps-Team freut sich, Ihnen mitteilen zu können, dass wir eine neue Version von create-react-web-component mit React 18-Unterstützung unter dem Namen [@geops/create-react-web-component](https://www.npmjs.com/package/@geops/create-react-web-component) veröffentlicht haben. 

Frohe Weihnachten!!!