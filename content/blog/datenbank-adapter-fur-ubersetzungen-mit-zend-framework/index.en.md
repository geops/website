---
title: Database adapter for translations with Zend Framework
summary: As part of a project, there was a requirement for customers to be able to freely edit the
  translations of the program interface. Here the
  the previous implementation of the translations using GNU gettext in the
  application reached its limits. An adapter for the Zend Framework
  now implements the necessary flexibility.
author: Friedjoff Trautwein
created: 2011-01-03
slug: database-adapter-for-translations-with-zend-framework
tags:
  - developers
published: false
---
Im Rahmen eines Projekt bestand die Anforderung, dass Kunden die Übersetzungen der Programmoberfläche frei bearbeiten können. Hierbei kam die bisherige Implementierung der Übersetzungen mittels [GNU gettext](http://www.gnu.org/software/gettext/) in der Applikation an Ihre Grenzen. Ein Adapter für das verwendete [Zend Framework](http://framework.zend.com/about/overview) setzt nun die notwendige Flexibiliät um.

Rahmenbedingungen:

- Alle übersetzbaren Texte müssen automatisch aus dem Quellcode extrahiert werden
- Kunde muss die Übersetzungen über Textfelder einfach anpassen können
- Fallbacks auf beliebige Sprachen müssen möglich sein
- Integration mit Zend Framework

Als Lösung für die oben genannte Problematik wurde ein Adapter für ZF entwickelt, den geOps veröffentlicht hat. Mit dem Adapter **Geops_Translate_Adapter_Db** können nun einfach Übersetzungen aus Datenbanken an ZF angebunden werden.  
Nach dem gängigen Konzept werden Übersetzungen im Quellcode mittels Funktionen markiert. Anschließend werden die bekannten Werkzeuge wie [Poedit](http://www.poedit.net/) oder [xgettext](http://www.gnu.org/s/hello/manual/gettext/xgettext-Invocation.html) verwendet um automatisch die übersetzbaren Texte aus dem Quellcode zu extrahieren. Es resultiert eine Übersetzungstabelle anhand derer Anwendungen lokalisiert werden können. Wir gehen einen Schritt weiter und legen diese Übersetzungstabelle direkt in der Datenbank des Kunden ab. Somit können die Übersetzungen vom Kunden über eine Web-Anwendung administriert werden.  
Innerhalb so lokalisierter Anwendungen wird initial vom Adapter **Geops_Translate_Adapter_Db** eine Abfrage an die Datenbank gestellt um die Übersetzungstable zu erhalten. Diese wird fortan in einem Cache vorgehalten um eine gute Performance zu erreichen. Zudem besteht die Möglichkeit einen Fallback, beispielsweise auf gettext, zu konfigurieren. Mit ZF erstellte Anwendungen lassen sich so einfach mit Datenbanken übersetzen.

Um Ihre Anwendung mit Hilfe von **Geops_Translate_Adapter_Db** zu übersetzen [kontaktieren Sie uns](/über-uns/kontakt "geOps kontaktieren") oder gehen Sie wie folgt vor:

- Erstellen Sie eine Tabelle mit den Spalten msgid (Schlüssel), msgstr (übersetzter Text) und locale (Sprachangabe) und speichern Sie diese als sample_schema.translations.
- Konfigurieren Sie den Adapter **Geops_Translate_Adapter_Db** beim Anwendungsstart in Bootstrap.php: new Zend_Translate(array( 'adapter' => 'Geops_Translate_Adapter_Db', 'content' => 'sample_schema.translations', 'locale' => 'de', 'fallback' => )
- Füllen Sie die Tabelle mit Übersetzungen.

Ihre ZF-Anwendung kann nun die Übersetzungen aus einer Datenbank beziehen. Damit sind Sie flexibel. Übersetzungen können im laufenden Betrieb vom Kunden ohne spezielle Werkzeuge bearbeitet werden. Es besteht der optional zu konfigurierende Fallback auf einen beliebigen Adapter für ZF um eine einfache Migration zu gewährleisten.
