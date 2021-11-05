---
title: Züge in Echtzeit auf Karten malen
summary: Für die Livemap der S-Bahn München zeigen wir Nutzern in Echtzeit die
  Positionen und aktuelle Prognosen zu Zügen an. In diesem Blog-Eintrag geht es
  darum, wie wir zwei Teilaspekte, Echtzeit und Skalierbarkeit, technisch
  umgesetzt haben.
author: Milan Oberkirch
cover: /images/blog/zuge-in-echtzeit-auf-karten-malen/tmap.png
created: 2018-11-17
slug: zuge-in-echtzeit-auf-karten-malen
tags:
  - mobility
  - realtime
published: true
---

Zunächst werden die Anforderungen skizziert und dann die von uns entwickelte Open-Source-Bibliothek [redis-websocket-api](https://github.com/geops/redis-websocket-api) vorgestellt, welche diesen Anforderungen gerecht wird.

## Echtzeit

Da die Züge ihre Position ändern, bekommen wir ständig neue Positionsdaten für einzelne Züge übermittelt. Diese werden unverzüglich verarbeitet und an alle verbundenen Clients (das Endgerät) weitergegeben. Hierfür sollten die Clients nicht ständig nach neuen Daten fragen müssen, sondern pro-aktiv vom Server informiert werden.

## Echtzeit im Web

In klassischen Web-Anwendungen läuft die Interaktion zwischen dem Client und dem Server in etwa so ab:

    Client: "Hallo, bitte gib mir die Positionen aller Züge!"
    Server: "OK, hier sind alle Daten. Auf Wiedersehen!"


Danach wird die Verbindung getrennt und der Server vergisst die Unterhaltung sofort wieder.

Wenn der Client nun kontinuierlich neue Daten bekommen möchte, müsste er in diesem Modell immer erneut nach den neuen Daten fragen. Fragt der Client jedoch zu oft, ist der Server überfordert, fragt er zu selten, sind die Daten, welche der Nutzer sieht, nicht aktuell.

Die Lösung sind sogenannte WebSockets. Hier läuft die Konversation zunächst wie zuvor:

    Client: "Hallo Server, lass uns in Kontakt bleiben!"
    Server: "OK, ich wechsele zum WebSocket Protokoll!"


Danach legt der Server aber diesmal nicht auf, sondern lässt die Verbindung offen. Ab jetzt können sowohl der Client als auch der Server jederzeit Nachrichten hin und her schicken ohne eine neue Verbindung herstellen zu müssen. So kann der Server beispielsweise jedes Mal, wenn sich Daten geändert haben, alle verbundenen Clients benachrichtigen.

### Echtzeit in der Programmierung

Klassische ("synchrone") Programme haben mit diesem Ansatz ein Problem: Sie bestehen aus einer Reihe von Befehlen, welche nacheinander abgearbeitet werden. Wenn der Befehl lautet, auf eine Nachricht vom Client zu warten, dann wartet das ganze Programm und ist solange blockiert, bis die Nachricht kommt.

Die Lösung ist "asynchrone Programmierung", hier führt das Programm eine Event-Loop aus, die auf beliebige Ereignisse (wie Nachrichten) reagiert. So kann ein Programm nicht nur zeitgleich mit mehreren Clients in Kontakt sein, sondern auch zeitgleich auf Nachrichten des Clients und beispielsweise einer Datenquelle im Backend reagieren. Da es hier meist um Input und Output geht wird diese Technik auch als AsyncIO bezeichnet.

## Skalierbarkeit

Obwohl wir mit AsyncIO grundsätzlich in der Lage sind, in einem Prozess mit mehreren Clients gleichzeitig zu kommunizieren, verursacht ein zusätzlicher Client immer noch zusätzliche Arbeit. So möchten verschiedene Clients zum Beispiel verschiedene Auszüge aus den Daten erhalten. Bei unserem Anwendungsfall nur Zugpositionen in dem gerade betrachteten Kartenausschnitt. Auch ist denkbar, dass unterschiedliche Client-Anwendungen auf die Server zugreifen und die Koordinaten mit unterschiedlichen Projektionen benötigen. Wir benötigen also mehrere Prozesse und auch mehrere Server, um die Last zu verteilen. Da die Datengrundlage aber für alle Clients die gleiche ist, sollen die Daten nur einmal für alle Clients aufbereitet und dann von separaten Servern verteilt werden.

Dieser Ansatz hat auch den Vorteil, dass unabhängig von den Schnittstellen zu den Quelldaten beliebig viele API-Server auch dynamisch hinzugefügt werden können. So verwenden wir Auto-Scaling, um bei Bedarf automatisch neue Server zu starten. Das Konzept ist im Prinzip mit den Informationsschaltern am Bahnhof vergleichbar: Die Angestellten (Server) greifen auf zentral gespeicherte Daten aus dem Rechenzentrum zurück und bereiten diese individuell für die Kunden (Client) auf. Je nach Bedarf werden auch hier mehr oder weniger Schalter belegt.

![teilweise besetzter Informationsschalter der Bahn](/images/blog/zuge-in-echtzeit-auf-karten-malen/DB_Informationsschalter_small.jpg)

_(Bild von [Wikipedia](https://de.wikipedia.org/wiki/Datei:DB_Informationsschalter.jpg))_

## Umsetzung

Der Kern der für die [Livemap der S-Bahn München](https://geops.de/sbahnm-live) verwendeten API steckt in der von uns entwickelten [redis-websocket-api](https://github.com/geops/redis-websocket-api), welche in der folgenden Skizze auf den API-Servern läuft. Durch Redis als Message Broker und Cache wird eine klare Trennung zwischen der Schnittstelle zum Client und der fachlichen Datenauswertung erreicht. Bei Bedarf werden beliebig viele API-Server gestartet werden, je nach dem wie stark die vorhandenen Server ausgelastet sind.

![Skizze der Server](/images/blog/zuge-in-echtzeit-auf-karten-malen/t.png)

Wir haben uns bei der Implementierung der Server-Client Schnittstelle im Backend für das AsyncIO framework von [Python 3.6](https://www.python.org/) mit der [websockets](https://github.com/aaugustin/websockets)\-Bibliothek entschieden.

Als Message-Queue und Cache kommt [Redis](https://redis.io) (mit [aioredis](https://github.com/aio-libs/aioredis)) zum Einsatz, wobei der Inhalt im JSON-Format übertragen wird.

Durch die Verwendung von JSON und Redis als Schnittstelle zwischen der Software zur fachlichen Datenaufbereitung kann diese Software unabhängig von anderen Backend-Komponenten auf beliebig vielen Servern verteilt werden.

Über den Cache kann der Client die Positionen aller Züge erfragen. Über die Message-Queue kommen dann die Updates. Konkret sieht die Kommunikation so aus:

    Server: {
        "source": "websocket",
        "timestamp": 1543407688441,
        "content": {"status": "open"}
    }

Mit der `PROJECTION` Nachricht teilt der Client dem Server mit, in welchem Format die Koordinaten übermittelt werden sollen, mit `BBOX` wird der vom Nutzer betrachtete Kartenausschnitt festgelegt.  Per `GET` werden die gecachten Daten abgefragt und mit `SUB` Änderungen abonniert.

Da die Kommunikation asynchron ist, schickt der Server Daten an den Client, sobald sie zur Verfügung stehen. Umgekehrt muss der Client nicht auf eine Antwort vom Server warten um eine neue Anfrage losschicken zu können.

Dass Cache und Channel gleich benannt sind ist hier übrigens nur eine Konvention. Auch die verwendeten Befehle sind frei konfigurierbar, mehr zu den technischen Details ist auf [GitHub](https://github.com/geops/redis-websocket-api) zu finden.
