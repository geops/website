---
title: Modellkonforme Datenprüfung mit dem ilivalidator
summary: Mit INTERLIS steht ein mächtiges Werkzeug für die standardisierte
  Beschreibung und den Austausch von Geodaten zur Verfügung. Trotz der weiten
  Verbreitung von INTERLIS und der Verankerung in Verordnungen (GeoIV-swisstopo)
  gibt es immer noch Lücken bei den Software-Werkzeugen, die INTERLIS
  unterstützen. Der ilivalidator, der 2016 als Open Source-Software zur
  Validierung von INTERLIS-Daten erschienen ist, hat eine dieser Lücken
  geschlossen.
slug: modellkonforme-datenprufung-mit-dem-ilivalidator
---
![](/images/blog/modellkonforme-datenprufung-mit-dem-ilivalidator/altlast4web%20_%20Interlis_0.png "altlast4web- und Interlis Logo")

  
  
  
  

## Modellkonforme Publikation des KbS

Altlast4Web ist eine von geOps entwickelte Software für die Organisation von Geodaten und die Koordination von Geschäftsprozessen für das Management von Altlasten. Schweizer Kantone und Bundessstellen sowie das Fürstentum Liechtenstein nutzen die Anwendung zur Führung des nach Umweltschutzgesetz (USG) und Altlastenverordnung (AltlV) verpflichtenden Katasters belasteter Standorte (KbS). Seit 15 Jahren wird die Software eingesetzt und seither kontinuierlich weiter entwickelt, um sowohl den technologischen Veränderungen wie auch den wechselnden fachlichen Anforderungen gerecht zu werden.

Seit 2008 ist [INTERLIS](https://www.interlis.ch/) in der Geoinformationsgesetzgebung als Beschreibungssprache vorgeschrieben. [Allgemeine INTERLIS-Modelle](http://models.geo.admin.ch/BAFU/) definieren die grundlegende Struktur für den Datenaustausch, und laufend kommen fachspezifische Modelle zur Beschreibung von Geobasisdatensätzen dazu. 2013 wurden auch für die Daten im Kataster belasteter Standorte unter dem Kurztitel "Altlasten" die relevanten INTERLIS-Modelle verabschiedet. Neben den Anforderungen des Minimalen Geodatenmodells (MGDM) wird in einem Transfermodell die Abbildung im Kataster der öffentlich-rechtlichen Eigentumsbeschränkungen (ÖREB) definiert.

Altlast4Web stellte bereits seit 2013, als die ersten Versionen der Modelle für Altlasten verabschiedet wurden, Exportschnittstellen gemäss [minimalem Geodatenmodell (MGDM) und ÖREB](https://www.bafu.admin.ch/bafu/de/home/zustand/daten/geodatenmodelle/altlasten--geodatenmodelle.html) zur Verfügung. Teil der Schnittstellen war von Anfang an auch die Überprüfung der Validität und Modellkonformität der Exporte. In einer ersten Umsetzung wurde die regelmässige nächtliche Publikation von Daten aus den Altlast4Web-Instanzen der Bundesämter für Verkehr (BAV) und Zivilluftfahrt (BAZL) auf die Datenaustauschplattform des Bundes ([data.geo.admin.ch](https://data.geo.admin.ch/)) realisiert. Jede Nacht, bevor die Daten auf der Plattform publiziert werden, erfolgt eine vollständige Überprüfung aller Daten. Sollten die Daten nicht valide sein oder gegen die Modelle verstossen, erfolgt eine automatisierte Mitteilung sowohl an die fachlich zuständigen Personen wie auch an geOps als Betreiber-Firma von Altlast4Web. Erst nach Korrektur aller Fehler werden die Daten publiziert.

![](/images/blog/modellkonforme-datenprufung-mit-dem-ilivalidator/service.png "Service")

Obwohl (oder gerade weil...) es seit Inbetriebnahme der Export-Schnittstellen nur in ganz wenigen Fällen zu Problemen kam, stellt die automatisierte Überprüfung einen unverzichtbaren Bestandteil der automatisierten Publikation des Katasters belasteter Standorte dar.

### Open Source Software ilivalidator

Nachdem ursprünglich nur ein proprietärer Checkservice für die Validierung verfügbar war, wurde 2016 mit dem [ilivalidator](https://github.com/claeis/ilivalidator) eine Open Source-Alternative verfügbar, die zudem ungleich flexibler als die zuvor eingesetzte proprietäre Software ist. Der ilivalidator stellt geringe Anforderungen an die Inbetriebnahme, einzig ein Java Runtime Environment (JRE) ab Version 1.6 ist erforderlich. Neben dem für die Automatisierung relevanten Aufruf über die Kommandozeile stellt der ilivalidator auch eine einfache Eingabemaske zur Verfügung, mit der sich schnell erste Tests durchführen lassen.

![](/images/blog/modellkonforme-datenprufung-mit-dem-ilivalidator/code.png "Code")

Beispielaufruf Kommandozeile:

```bash
java -jar ilivalidator.jar [options] file.xft  
```  

Der grosse Vorteil des ilivalidators gegenüber anderen verfügbaren Tools zum INTERLIS-Check ist, dass es keine lizenzrechtlichen Hürden und keine Einschränkungen bei der Betriebssystem-Unterstützung gibt. Für den Einsatz in automatisierten Routinen auf den LINUX-Servern, auf denen Altast4Web betrieben wird, sind beide Punkte essentiell.

### Integration in Altlast4Web

Der ilivalidator steht auf [Github als ZIP-Download](https://github.com/claeis/ilivalidator/releases) bereit. Die entpackten Dateien werden auf den Altlast4Web-Servern abgelegt, weitere Installationen sind nicht notwendig. Für einen versionsunabhängigen Workflow wird die ilivalidator-XXX.jar Datei, welche für die Exporte verwendet wird, als ilivalidator-latest.jar ausserhalb der entpackten Versionsordner gespeichert. Der Ablauf der Exporte vollzieht sich folgendermassen. In Altlast4Web werden die Daten mit spezifischen Funktionen in einer PostGIS-Datenbank in INTERLIS-konformes XML transformiert. Der Export selbst wird über nächtliche Cronjobs angestossen, die ein Python-Skript aufrufen. Das Skript exportiert die Daten aus der Datenbank und schreibt sie in xtf-Dateien. Die xtf-Dateien werden dann mit dem ilivalidator überprüft. Dabei werden die Modelle, gegen die geprüft werden soll, explizit in den Exportdateien angegeben.

```xml
< HEADERSECTION SENDER = "altlast4web" VERSION = "2.3" >
  < MODELS >
    < MODEL NAME = "CoordSys" VERSION = "2015-11-24" URI = "https://www.interlis.ch/models" />
   < MODEL NAME = "InternationalCodes_V1" VERSION = "2011-08-30" URI = "https://www.geo.admin.ch" />
    < MODEL NAME ="Localisation_V1" VERSION= "2011-08-30" URI = "https://www.geo.admin.ch" />
    < MODEL NAME = "LocalisationCH_V1" VERSION = "2011-08-30" URI = "https://www.geo.admin.ch" />
    < MODEL NAME = "Dictionaries_V1" VERSION = "2011-08-30" URI = "https://www.geo.admin.ch" />
    < MODEL NAME = "DictionariesCH_V1" VERSION = "2011-08-30" URI = "https://www.geo.admin.ch" />
    < MODEL NAME = "Units" VERSION = "2012-02-20" URI = "https://www.interlis.ch/models" />
    < MODEL NAME = "GeometryCHLV03_V1" VERSION = "2015-11-12" URI = "https://www.geo.admin.ch" />
    < MODEL NAME = "GeometryCHLV95_V1" VERSION= "2015-11-12" URI = "https://www.geo.admin.ch" />
    < MODEL NAME = "KbS_Basis_V1_4" VERSION = "2018-06-13" URI = "https://models.geo.admin.ch/BAFU" />
    < MODEL NAME = "KbS_LV03_V1_4" VERSION= "2018-06-13" URI = "https://models.geo.admin.ch/BAFU" />
    < MODEL NAME = "KbS_LV95_V1_4" VERSION = "2018-06-13" URI = "https://models.geo.admin.ch/BAFU" />
  </ MODELS >
</ HEADERSECTION >
```    

Standardmässig sucht ilivalidator die aufgelisteten Modelle lokal oder in den öffentlichen Repositorys http://models.interlis.ch/ und http://models.geo.admin.ch. Altlast4Web Server ohne Zugriff auf die öffentlichen Repositorys oder Instanzen mit eigenen INTERLIS-Modellen halten die Modelle lokal vor.

  
  

`def` `get_ilivalidator_errors(xtf_name, xtf_data):`

  `"""Submit the contents of a xtf file to the ilivalidator jar binary.`

  `Return the exitcode and any errors found in a logfile.`

  `Returns a tuple (exitcode, log_content) of the result of the`

  `ilivalidator call.`

  `"""`

 `tmpdir` `=` `tempfile.mkdtemp(prefix` `=` `'ilivalidator_check.'` `)`

  `java_dir` `=` `get_config(` `'ilicheck.java'` `)`

  `xtf_path` `=` `os.path.join(tmpdir,` `'%s.xtf'` `%` `xtf_name)`

  `with` `open` `(xtf_path,` `'wb'` `) as f:`

  `f.write(xtf_data)`

  `ilivalidator_cmd` `=` `[java_dir,` `'-jar'` `, ILIVALIDATOR_JAR, xtf_path]`

  `p` `=` `subprocess.Popen(ilivalidator_cmd, cwd` `=` `tmpdir, stdout` `=` `subprocess.PIPE, stderr` `=` `subprocess.STDOUT)`

  `out, _` `=` `p.communicate()`

  `shutil.rmtree(tmpdir)`

  `return` `p.returncode, out`

  
  

Die Ausgabe des Returncodes ist ausschlaggebend für den Upload der Exporte. Nur nach einer erfolgreichen Validierung (returncode = 0) der Daten werden diese publiziert. Das Protokoll der erfolgreichen Validierung wird in dem Fall als log-Datei zusammen mit den Daten exportiert, quasi als Beleg der durchgeführten Qualtitätssicherung.

### Fazit

Mit Integration des ilivalidators konnten die INTERLIS-Exporte aus Altlast4Web noch einmal deutlich verbessert werden. Für jeden Kunden ist nun die Validierung der Exporte sowohl gegenüber den INTERLIS-Modellen des Bundes wie auch gegen kantonale Modelle möglich, ohne dass separate Lizenzkosten anfallen. Der ilivalidator ist somit aus unserer Sicht ein wichtiger Schritt auf dem Weg, INTERLIS in der Praxis immer effizienter einzusetzen.