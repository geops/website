---
title: GraphQL - Hackathon 2022
summary: "Mitglieder des geOps-Entwicklerteams erforschen GraphQL in einem
  internen Hackathon, um dessen Potenzial für geOps-Projekte zu entdecken. "
created: 2023-01-30
slug: graphql-hackathon
published: true
---
![](/images/blog/graphql-hackathon-2022/graphql.png)

Bei geOps erforschen die Entwickler ständig die neuesten Technologien, um sicherzustellen, dass die Anwendungen die modernsten Webtechnologiestandards verwenden. Daher ist es selbstverständlich, dass [GraphQL](https://graphql.org/) ein häufiges Thema bei der Entwicklung ist. GraphQL ist eine leistungsstarke API-Abfragesprache, die sich in den letzten Jahren einen Ruf als flexible und funktionsreiche Alternative zu RESTful APIs erworben hat. Dies hat geOps dazu bewogen, sie in neuen Projekten einzusetzen und ihr volles Potenzial zu erkunden. 

In 2022 beschlossen Mitglieder des GeOps-Entwicklerteams, ein internes, gemeinsames Coding-Event zu organisieren. Ziel war es, die Möglichkeiten, Tools und Bibliotheken rund um GraphQL zu entdecken und sie in bestehenden geOps-Projekten anzuwenden, indem bestimmte Komponenten überarbeitet wurden. So wurde der GraphQL-Hackathon ins Leben gerufen.

Ein Team von sieben Entwicklern nahm daran teil, darunter Backend- und Frontend-Ingenieure. Als Zeitrahmen für den Hackathon war ein ganzer Tag vorgesehen. Die Veranstaltung begann damit, dass die Hauptmotivatoren einen kurzen Einblick in die Kernprinzipien von GraphQL gaben, wie die Abfragesprache funktioniert und welche Vorteile sich aus ihrer Verwendung ergeben. Anschließend diskutierte das Team, welche Komponente aus welchem Projekt in Anbetracht des begrenzten Zeitrahmens mit GraphQL umgesetzt werden könnte. Man kam zu dem Schluss, dass die von geOps entwickelte [Live-Map der S-Bahn München](https://s-bahn-muenchen-live.de) ein geeignetes Projekt zum Experimentieren wäre, da sie sowohl Standard-Datenabfragen als auch Echtzeit-Daten-Subscriptions erfordert, die in vielen geOps-Projekten wesentlich sind. Das Team begann mit der Entwicklung einer Abfahrtstafel für eine Station, einschließlich Backend und Frontend.

Auf der Grundlage eines begrenzten Funktionsumfangs wurde ein minimales GraphQL-Schema definiert, das dem Frontend- und dem Backend-Team eine gemeinsame Grundlage für die parallele Arbeit bot. Das Backend-Team konzentrierte sich darauf, die [Strawberry](https://strawberry.rocks/)-Bibliothek kennenzulernen und mit unserer bestehenden Stationsfinder-API und Echtzeit-Datenbank loszulegen. Zum Mittagessen stand dem Frontend-Team bereits ein Prototyp zur Verfügung. In der Zwischenzeit beschloss das Frontend-Team, verschiedene GraphQL-Browser-Bibliotheken auszuprobieren, wobei der Schwerpunkt auf der Unterstützung von GraphQL-Subscriptions lag. Die Ergebnisse waren gemischt und werden wertvolle Erkenntnisse für weitere Bemühungen im GraphQL-Frontend-Bereich liefern. Am Ende hatten wir zwei verschiedene Prototypen, die eine einfache Benutzeroberfläche implementierten, um Bahnhöfe zu finden und Echtzeitinformationen über ankommende und abfahrende Züge anzuzeigen.

Das gesamte Team war begeistert von den Vorteilen und Möglichkeiten, die GraphQL zu bieten hat. Die schnellen Fortschritte des Backend-Teams waren besonders vielversprechend und alle freuten sich auf einen Folge-Hackathon.