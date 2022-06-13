---
title: mapset 2.0 mit MUI
summary: mapset 2.0 wurde unter Verwendung der
  Open-Source-React-Komponentenbibliothek MUI (Material-UI) umfassend
  überarbeitet.
created: 2022-06-08
slug: mapset-mit-mui
published: true
---
Die Entwicklung für mapset ist wieder in vollem Gange. Für mapset 2.0 wurden die Abhängigkeiten von geOps-internen UI-Bibliotheken zugunsten der Open-Source React-Komponenten-Bibliothek [MUI](https://mui.com/) (Material-UI) aufgegeben.

Komponenten-Bibliotheken und -frameworks machen das Leben eines Frontend-Entwicklers in vielerlei Hinsicht einfacher. Erstens können sie die Entwicklung drastisch beschleunigen, da die gewünschten Komponenten mit großer Wahrscheinlichkeit bereits im Paket enthalten sind. In den meisten Fällen sind die Komponenten sehr einfach zu verwenden und werden mit einer ausführlichen Dokumentation und Beispielen geliefert. Zweitens sind Themen wie Browserkompatibilität und Barrierefreiheit in der Regel enthalten, was dem Entwickler eine Menge mühsamer Code-Erstellung erspart. MUI steht schon seit einiger Zeit an der Spitze der Beliebtheitsskala der React-Komponentenbibliotheken, mit 78k Sternen auf Github und über 1,3 Millionen wöchentlichen Downloads auf npm (Stand 25.05.2022). Dies machte die Wahl für geOps leicht.

MUI bietet eine vollständige Suite von grundlegenden bis hin zu fortgeschrittenen React-Komponenten. Neben den üblichen UI-Komponenten wie Buttons, Navigationsleisten, Modals und Formularen bietet die Bibliothek auch funktionale Elemente und spezielle [Hooks](https://reactjs.org/docs/hooks-intro.html), die die App-Entwicklung schnell und einfach machen. Das Styling der MUI-Komponenten basiert standardmäßig auf dem [Material-Design](https://material.io/design)-System von Google, aber MUI bietet mehrere [Ansätze für die Anpassung von Styles](https://mui.com/material-ui/guides/interoperability/).

Mehrere geOps-Apps basieren auf MUI und neue Funktionen in mapset wurden seit 2020 mit MUI-Komponenten entwickelt. Einige ältere Komponenten basierten jedoch noch auf hauseigene Packages und/oder Bibliotheken von Drittanbietern. Durch den Ersatz dieser Komponenten durch MUI-Komponenten haben nun alle App-Komponenten Zugriff auf ein injiziertes [MUI-Theme](https://mui.com/material-ui/customization/theming/), was das globale Styling zu einem Kinderspiel macht. Viele der überarbeiteten UI-Elemente verwenden nun die gleiche Codebasis über die importierten MUI-Komponenten, was zu einem einheitlichen Erscheinungsbild führt. Eine weitere Verbesserung war die Entfernung der meisten SCSS-Dateien der App. mapset verwendet nun den in MUI integrierten js-to-CSS-Ansatz für das Styling. CSS wird als JavaScript-Objekte geschrieben, die CSS-Klassen werden beim Kompilieren der App erstellt, was zu einem stabileren Kompilierungsprozess führt.

MUI als Fundament für die mapset-UI eröffnet eine völlig neue Dimension an Möglichkeiten und Ansätzen für eine schnelle und einfache UI-Erstellung. Wir sind gespannt, was künftige MUI-Versionen zu bieten haben und welche neuen Funktionen ein optimales Benutzererlebnis in der mapset-UI garantieren werden.