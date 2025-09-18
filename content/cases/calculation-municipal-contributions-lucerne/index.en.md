---
title: "Greater efficiency through digitalisation: calculation of municipal
  contributions to public transport in the canton of Lucerne"
summary: Our automated solution makes the calculation of public transport
  contributions in the canton of Lucerne efficient, error-free and transparent.
  GTFS data enables a transparent process. Instead of manual Excel evaluations,
  correct and transparent figures are now available at the touch of a button.
slug: calculation-municipal-contributions-lucerne
gridImage: /images/cases/greater-efficiency-through-digitalisation-calculation-of-municipal-contributions-to-public-transport-in-the-canton-of-lucerne/bahnhofplatz_luzern.webp
weight: 3
cover: /images/cases/greater-efficiency-through-digitalisation-calculation-of-municipal-contributions-to-public-transport-in-the-canton-of-lucerne/2023_linie10-e-bus-eveline-beerkircher.jpg
customer: Lucerne Transport Network VVL
service: Automated timetable evaluation
timeline: Seit 2023
content:
  sections:
    - orientation: column
      title: High expenditure for fair cost distribution
      text: >-
        Public transport in the canton of Lucerne is co-financed by the
        participating municipalities. To ensure that costs are distributed
        fairly, the VVL calculates the municipal contributions annually
        (https://www.vvl.ch/oev-angebot/dienstleistungen/finanzierung/gemeindebeitraege).
        This is based on the number of departures at all stops in a
        municipality. This is a clear method in itself, but it was costly to
        implement in practice.


        Until now, timetable data was evaluated by the transport companies, manually transferred to a template, sent to the VVL and checked there on a random basis. This process involved a great deal of effort for the transport companies and the VVL and was also prone to errors. The VVL therefore sought a solution to automate the process while increasing the quality and traceability of the results.
    - orientation: row
      text: >-
        Our tailor-made solution is based on the open timetable data (GTFS) from
        [opentransportdata.swiss](https://opentransportdata.swiss/). It
        automatically determines the number of departures per stop and
        municipality – taking into account all relevant special cases:


        * **Seasons and public holidays** with different timetables

        * **Loops** where journeys must not be counted twice

        * **Non-contributory lines or categories** that are filtered out

        * **Temporary restrictions**, e.g. due to construction sites, which are ignored


        The calculation is transparent and can be traced at any time. Anomalies and inconsistencies are automatically
      title: Automation with open GTFS data
      image: /images/cases/greater-efficiency-through-digitalisation-calculation-of-municipal-contributions-to-public-transport-in-the-canton-of-lucerne/vvl.png
    - orientation: column
      text: >-
        What used to take many hours of manual work is now largely automated.
        Fast, reliable and transparent.


        * Significantly less effort required for evaluations and follow-up work

        * Less effort required for administrative processes

        * Error reduction through automated calculations and integrated quality assurance

        * Clearly comprehensible results for local authorities and transport companies

        * Flexible adaptability for future routes, stops or regulations


        Thanks to our experience and the use of standardised data formats, the project was completed with minimal effort and to the customer's complete satisfaction.
      title: More speed, fewer errors, satisfied partners
    - orientation: column
      text: Whereas previously a blank Excel spreadsheet was used at the start of the
        process, the new solution delivers a fully populated Excel spreadsheet
        as the result. We opted for Excel as the output format in order to give
        VVL the greatest possible flexibility for further evaluation. The
        timetable data is imported and the departures are counted correctly in
        our data hub using DuckDB. We then write the raw results to an Excel
        template, where prepared formulas and pivot queries automatically
        generate different views and groupings of the data. The VVL can import
        this data into its ERP systems or revise it for further evaluation using
        the usual EXCEL on-board tools. The control of the entire process, from
        data import to output as EXCEL, is set up in our build environment as a
        Gitlab CI/CD pipeline and can thus be repeated at any time at the touch
        of a button.
      title: Data quality at the touch of a button
    - orientation: column
      title: "Looking ahead: achieving more together"
      text: Digital solutions such as these demonstrate how open data and intelligent
        systems can simplify everyday public transport. They save time, increase
        transparency and build trust between all parties involved.
  lead: Our automated solution makes the calculation of public transport
    contributions in the canton of Lucerne efficient, error-free and
    transparent. GTFS data enables a transparent process. Instead of manual
    Excel evaluations, correct and transparent figures are now available at the
    touch of a button.
  title: "Greater efficiency through digitalisation: calculation of municipal
    contributions to public transport in the canton of Lucerne."
testimonials:
  - text: Manually processing around 140 Excel files is now a thing of the past.
      Thanks to geOps' automated timetable evaluation, we save time, reduce
      errors and gain noticeable efficiency – not only for us, but also for the
      transport companies.
    position: Public transport finance specialist, VVL
    name: Sylvie Gernet
tags:
  - processes
---
