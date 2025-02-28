---
title: EuroPython 2024 in Prag
summary: Im Juli fuhren zwei Backendentwickler mit dem Nachtzug nach Prag, um an
  der EuroPython teilzunehmen.
author: Tobias Kronauer
cover: /images/blog/europython-2024-in-prag/img_20240710_210923.jpg
created: 2024-09-12
slug: euro-python-2024
frontpageImage: /images/blog/europython-2024-in-prag/img_20240710_210923.jpg
published: true
---
Im Juli 2024 nahmen wir, Milan und Tobias, an der [EuroPython](https://ep2024.europython.eu/) in Prag teil. Die Konferenz gehört zu den größten Python-Konferenzen Europas und richtet sich sowohl an Expert:innen als auch Anfänger:innen. Wir konnten nicht nur Maintainern von namhaften (Open Source)-Bibliotheken wie [pydantic](https://docs.pydantic.dev/latest/), [Sentry](https://sentry.io/) und [FastAPI](https://fastapi.tiangolo.com/) zuhören, sondern auch bei warmen Sommerabenden ein (oder auch mehrere) Bier an der Moldau genießen. Das aber nur in Lokalen, da Alkoholkonsum in der Öffentlichkeit verboten ist, wie wir feststellen mussten.

![](/images/blog/europython-2024-in-prag/img_20240710_210923.jpg)

Die Konferenz an sich dauerte eine Woche und war in mehrere Teile unterteilt: Zwei Tage fanden Tutorials und Workshops statt, drei Tage gab es Vorträge und Keynotes und abschließend über das Wochenende Sprints. Wir beide nahmen lediglich an den Vorträgen teil, während Milan noch kurz zu den Sprints reinschnupperte.

Ich fand die Vorträge alle gut bis sehr gut. Dies lag sicherlich auch am professionellen Setting, denn viele der Vortragenden kamen von namhaften Unternehmen. Die Konferenz wurde komplett von Freiwilligen organisiert, dennoch waren auch große Unternehmen wie Bloomberg und Microsoft vor Ort.

Wie es sich für ein Unternehmen im Bereich des öffentlichen Verkehrs gehört, fuhren wir beide mit dem Nachtzug in einer tropischen Nacht von Freiburg nach Prag. Wir kamen direkt mit der ersten Kaffeepause im Prager Konferenzzentrum an. Der Kaffee war auch dringend nötig, da ich durch die nicht-vorhandene Klimaanlage im Zug die ganze Nacht über kein Auge zugemacht habe.

Durch die Konferenz zogen sich mehrere Themenkomplexe. Zum einen stand die Performance-Optimierung von Python im Fokus. Ein Ansatz war z.B. Type Annotations zu verwenden für eine statische Typisierung von Python. Diese statische Typisierung wird zur Laufzeit erzwungen. Durch die Implementierung des alternativen Python-Interpreters [spy](https://github.com/spylang/spy) können diese statischen Typen für Performance Verbesserungen verwendet werden. Zudem gab es eine Einführung in [PEP683](https://peps.python.org/pep-0683/), das mittlerweile in CPython übernommen wurde. Ziel des PEPs ist die Optimierung des Speicherbedarfs. Die Idee ist sogenannte "immortal objects" einzuführen, die nie zur Laufzeit vom Garbage Collector aufgeräumt werden.

Ein weiteres Themenfeld war Parallelität. Zum einen wurde häufig die [optionale Deaktivierung](https://www.heise.de/news/Python-3-13-Endlich-effizienteres-Multithreading-ohne-Global-Interpreter-Lock-9655663.html) des Global Interpreter Locks (GIL) in Python 3.13 erwähnt, aber vor allem auch auf Coroutinen eingegangen. Ich fand dabei einen Vortrag zum Bauen einer eigenen Eventloop für asynchronen Code sehr interessant. Obwohl es für mich inhaltlich nichts neues war, machte es mir doch deutlich wie "einfach" man abstraktes Verhalten in Code gießen kann. Ein paar Queues, Callbacks und Flags bildeten schließlich das Grundgerüst für die Event Loop. Weiterhin wurde das Thema Synchronisierung im Zusammenhang mit Multithreading erklärt. Dabei gab es eine Übersicht über die verschiedenen Semaphoren welche zur Synchronisation verwendet werden. Milan meinte dieser Vortrag hätte ihm einige Stolpersteine bei der Implementierung eines unserer Projekte geholfen, das stark auf asynchroner Datenverarbeitung aufbaut.

Die für mich, aber auch für andere, interessanteste Keynote war von Armin Ronacher, dem Director of Engineering bei Sentry und Hauptentwickler von [Flask](https://palletsprojects.com/projects/flask). Der Konferenzsaal war bis zum letzten Platz voll. Im Vortrag ging es um das Thema Packaging. Obwohl er seine Packaging Lösung [rye](https://rye.astral.sh/) vorstellte, ging es dabei nicht um rye an sich, sondern vielmehr um ungeahnte Probleme, die beim Packaging auftreten und potenzielle Lösungsmöglichkeiten. Ich fand es erstaunlich, dass es so schwierig ist eine Bezugsquelle für Python zu verwenden, die für sämtliche Plattformen gilt. Ich fand es überraschend, dass überhaupt [dieses](https://github.com/indygreg/python-build-standalone) GitHub-Repository von einem Freiwilligen notwendig ist, um kompilierte Python-Version für jede Plattform zur Verfügung zu stellen. Seiner Meinung nach ist vieles schon gelöst, man müsse sich nur entscheiden. Dabei wurde auch klar, dass Packaging mehr ist als nur wheels zu bauen, sondern dazu gehört auch Dependency Resolution, das Beziehen von Python an sich, lokale Entwicklungsumgebungen etc.

Freitag abends wurde die Konferenz abgerundet von unterhaltsamen Vorträgen wie Musizieren mit Python Code und Lightning Talks.

Samstags ging es mit dem Zug wieder nach Hause. Für uns war die Konferenzteilnahme sehr bereichend. Wir haben einiges Neues gelernt und konnten Bestehendes vertiefen.