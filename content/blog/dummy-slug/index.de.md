---
title: Swiss Python Summit 2023
summary: Am 21. September 2023 machte sich unser Backendentwickler Tobias auf
  den Weg nach Rapperswil um am Swiss Python Summit 2023 teilzunehmen.
created: 2023-10-31
slug: swiss-python-summit-2023-konferenz
published: false
---
Am 21. September 2023 nahm ich am [Swiss Python Summit](https://www.python-summit.ch/) in Rapperswil, Schweiz teil. Die Organisation versteht sich als Schweizer Version der EuroPython 2015 und findet seit 2016 statt. Ziel dabei ist ein Wissensaustausch zwischen Python-Anwender:innen und richtet sich sowohl an Anfänger:innen als auch an Erfahrene.

Die Konferenz fand bei herrlichem Frühherbstwetter in einem Gebäude der Hochschule OST, direkt am Zürichsee gelegen, statt.

Die Themenauswahl der Referenten war sehr breit gestreut und bediente mehrere Zielgruppen, von wissenschaftlichen Vorträgen zu Anwendungen von Machine Learning über Webentwicklung mit Python bis hin zur Einführung in Cpython. Trotz ihrer Unterschiedlichkeit, hatten alle Vorträge eins gemein: sie holten einen sehr gut ab, aber gingen dennoch gut ins Detail.

Ein interessanter Vortrag war über die Libary [Kivy](https://kivy.org/), welche Frontendentwicklung in Python ermöglicht. Während Python hauptsächlich für das Backend bekannt ist, war es spannend zu sehen welche Entwicklungen im Frontendbereich geschehen. Ein Hauptaugenmerk von Kivy ist dabei, mit einer Codebasis Apps für verschiedene Plattformen zu entwickeln, was den Entwicklungsaufwand sehr stark reduziert. Die Library steckt noch in den Kinderschuhen, bietet sich sich aber als interessante Alternative zu [PyQt](https://riverbankcomputing.com/software/pyqt/intro) an.

Im Vortrag [A walk with Cpython](https://www.youtube.com/watch?v=36ntN0u7Bm0&feature=youtu.be&themeRefresh=1) lag der Fokus darauf, die Zuhörer:innen in die Welt des Python Compilers einzuführen. Auf Basis eines simplen Python-Skripts wurden die Hintergrundschritte von Cpython erklärt, der Referenzimplementierung von Python. Ziel war Fremdwörter wie [Abstract Syntax Tree](https://devguide.python.org/internals/compiler/#abstract-syntax-trees-ast), [Continuous Flow Graph](https://devguide.python.org/internals/compiler/#control-flow-graphs), OPCODES etc. zu entzaubern. Obwohl ein genaues Verständnis für die Python-Implementierung für Webentwicklung selten benötigt wird, hilft es doch viel für das Hintergrundverständnis. Auch gibt es einem die Möglichkeit, performanteren Code zu schreiben und zu verstehen warum dieser schneller läuft (wie zum Beispiel [List-Comprehensions unter Python 3.11](https://docs.python.org/3.11/whatsnew/3.11.html#pep-659-specializing-adaptive-interpreter)).

Das leidige aber umso wichtigere Thema „Dokumentation“ wurde im Vortrag „Documenting Python Code“ behandelt. Der kritische Blick von Christian Heitzmann auf den Prozess der Dokumentation hilft einem auch interne Prozesse weiter zu optimieren und zu hinterfragen. Dabei zeigte sich aber auch gleichzeitig, dass die internen Prozesse von geOps in großen Teilen mit den Empfehlung des Vortragenden übereinstimmen. Ein sehr bestärkendes Gefühl!

Gegen Ende hin kam dann der mich interessanteste Vortrag: [A Short History of Python Web Frameworks](https://www.youtube.com/watch?v=K3y3f3mLJfk&feature=youtu.be). Quazi Nafiul Islam führte einen durch die historische Entwicklung von Web Frameworks in Python. Beginnend mit der ersten Version des HTTP Protokolls in den 90er Jahren zeigte er die Entwicklung von Python Frameworks, Schnittstellen etc. zu heutigen allumfassenden Bibliotheken wie Django. Dabei ging er auch darauf ein warum Frameworks sich über die Zeit behaupten, während andere relativ schnell verschwinden. Das Hauptargument seiner Meinung nach: die Offenheit des Entwicklerteams neue Technologien zu implementieren.

Die Konferenz wurde mit kurzen Lightning Talks abgerundet, in deren Rahmen Teilnehmende aus dem Publikum kleinere Python Tricks vorstellen konnten.

Abends um 17 Uhr ging mein Zug nach Hause. Insgesamt war es eine bereichernde Konferenzteilnahme, die einem neues Wissen mitgab, gleichzeitig aber auch bestehendes auffrischte.