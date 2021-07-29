---
title: Neue Funktionen im GeoCMS "Cartaro"
summary: Mit unserem Online-Tool Cartaro lassen sich räumliche Informationen
  komfortabel verwalten und auf Knopfdruck in einer Webkarte veröffentlichen.
created: 2021-07-28
slug: cartaro
published: false
---
<!--StartFragment-->

Im Zentrum unseres Content Managament Systems (CMS) steht der Raumbezug der verwalteten Daten, weshalb wir Cartaro auch als "GeoCMS" bezeichnen. Insbesondere im Auftrag der SBB haben wir unser GeoCMS in letzter Zeit intensiv weiterentwickelt. Dieser Blog-Beitrag gibt einen Überblick über die wichtigsten neuen Funktionen. Vorher werden die Hauptfunktionen von Cartaro kurz zusammengefasst.

## Ein kurzer Steckbrief

Die Kernfunktion von Cartaro ist die automatische Erzeugung von Erfassungsformularen auf Basis von Datenbank-Tabellen. Auf Basis des Datenmodells generiert Cararo automatisch ein [JSON-Schema](https://json-schema.org/), welches anschliessend vom Client in ein Formular "übersetzt" wird. Standard-Felder, wie Checkboxen, Eingabefelder und Drop-Downs, lassen sich durch Überschreiben des Schemas einfach durch eines der zahlreichen Cartaro-Widgets, z.B. für den Bild-Upload, ersetzen. Es können flexibel weitere Widgets für beliebige Datenformate in Cartaro integriert und die Felder zugunsten der Übersichtlichkeit verschachtelt werden. Die Geometrie-Bearbeitung erfolgt über die Kartenansicht. Dank des integrierten [OpenLayers Editors](https://openlayers-editor.geops.de/) lassen sich beliebige Geometrien erstellen, bearbeiten und mit Snapping-Tools aneinander ausrichten.

<!--EndFragment-->

![](/images/blog/neue-funktionen-im-geocms-cartaro/cartaro_n_01.jpg "Natürlich kann Cartaro auch mit komplexen Datenmodellen umgehen und die Inhalte verknüpfter Tabellen entweder inline oder in separaten Formularen bearbeitbar machen. Das folgende Kapitel zeigt zudem, wie wir unser GeoCMS einsetzen, um Informationen aus unserer Datendrehscheibe mit Zusatzinformationen anzureichern.")

<!--StartFragment-->

## Zusatzinformationen für beliebige Objekte

In Cartaro lassen sich neue geographische Objekte anlegen, bearbeiten und mit thematischen Attributen versehen. Es können aber auch bestehende Objekte mit bekannter Geometrie mit Zusatzinformationen anreichern. Dazu haben wir Cartaro an unsere Datendrehscheibe angeschlossen, in der wir unter anderem weltweite Stationsdaten und Verkehrsnetze in unterschiedlichen Generalisierungsstufen vorhalten. So können Stationen mit spezifischen Informationen, z.B. zum Reisen für Personen mit eingeschränkter Mobilität erfasst und in einer [Webkarte](https://maps2.trafimage.ch/ch.sbb.handicap) publiziert werden. Neu ist die Funktion um Zusatzinformationen auf Verkehrsnetzen abzubilden. Für die räumliche Verortung der Informationen werden Liniennummer, Start- und Endkilometer des jeweiligen Segmentes gespeichert. Das Speichern der Kilometrierungsinformationen gewährleistet, dass die Informationen in allen Generalisierungsstufen und auch nach einer Veränderung des Linienverlaufes zur Verfügung stehen. 

<!--EndFragment-->

![](/images/blog/neue-funktionen-im-geocms-cartaro/cartaro_02.jpg)

<!--StartFragment-->

Die neue Kilometrierungs-Funktion kommt bei der SBB zum Beispiel zum Einsatz, um Verantwortlichkeiten zu Liniensegmenten zu verwalten und in der [Webkarte "Koordinatoren Bahnnahes Bauen"](https://maps.trafimage.ch/ch.sbb.regionenkarte.public) anzuzeigen.

## Integration unseres Routing-Dienstes

Unser Routing-Dienst unterstützt eine Vielzahl an Fortbewegungsarten. Besonders bei Fahrzeugen des öffentlichen Verkehrs liefern wir bessere Ergebnisse als jeder andere Dienst. Um auch Routenverläufe mit themenspezifischen Informationen anreichern zu können, haben wir Cartaro mit unserem Routing-Dienst verknüpft. Nun lassen sich im Eingabeformular Start- Via- und Endstationen definieren, das Verkehrsmittel auswählen und anschliessend Informationen zur so erstellten Route erfassen. Die von uns entwickelte Webkarte zu Direktverbindungen der SBB im Tag- und Nachtnetz wird demnächst publiziert. Wir informieren im Blog und unseren anderen Kanälen, sobald Sie sich in der Webkarte den nächsten Nachtzug in den Urlaub heraussuchen können.

## Und noch mehr

Mit jedem neuen Thema, das wir in Cartaro integrieren, wächst auch die Anzahl der zur Verfügung stehenden Widgets, Filter und sonstigen Funktionen. Cartaro verfügt über Widgets für die Erfassung von Datumsfeldern, den Dateiupload, einen Koordinaten-Picker und viele mehr. Auch die Listenansicht von Cartaro haben wir weiterentwickelt. Sie kann nun mit beliebig vielen Einträgen umgehen und verfügt über Filter und Möglichkeiten zur Mehrfachbearbeitung. Eine Auflistung aller Funktionen und der diversen Schnittstellen von Cartaro findet sich auf der Lösungsseite.

<!--EndFragment-->