---
title: Swiss transit schedule data available as GTFS
summary: We provide regulary updated GTFS feeds from the official schedule data
  of Switzerland.
author: Uli Müller
cover: /images/blog/swiss-transit-schedule-data-available-as-gtfs/abfahrtstafel.JPG
created: 2014-06-25
slug: swiss-transit-schedule-data-available-as-gtfs
tags:
  - developers
  - mobility
  - realtime
published: true
---
On our site [gtfs.geops.ch](http://gtfs.geops.ch) we provide regularly updated GTFS feeds containing public transit data of Switzerland for free download. The feeds are based on the [official Swiss schedule](http://www.fahrplanfelder.ch/de/fahrplandaten/) that is being published in the HAFAS format. We download and convert the data each week shortly after publication on [www.fahrplanfelder.ch](http://www.fahrplanfelder.ch) and convert them to GTFS. So you will find new data every Tuesday (only in case of a holiday publication of the original data as well as that of the GTFS feeds may be postponed).

The GTFS format makes transit schedule data easier to implement for developers. GTFS has a more transparent structure than the original HAFAS data. It is easier to use and to extend and is much better documented. CSV, which is at the base of GTFS, can be read form machines as well as from humans. Moreover there is a large set of tools for visualizing, validating and modifying GTFS. Open Source route finders as e.g. [OTP](http://www.opentripplanner.org/) require GTFS as the only supported input format.

The version of the feed available for free download does not contain every bit of information present in the original data. For every need that goes beyond the public download we are happy to offer our individual services. These include value adding in the following fields:

*   Extraction of any information present in the raw data and conversion into a form compliant with the GTFS specifications.
*   Exact geographic mapping of all connections to railroad tracks and roads and conversion into the GTFS feed or any other geodata format. Data of this kind is used in our worldwide tracker [TRAVIC](http://tracker.geops.de/?z=13&s=1&lat=47.3774&lon=8.5455).
*   Extraction of data for specific regions and transport agencies.
*   Merge of several feeds into cross-border datasets.

All data can be provided as one-time conversions as well as in the form of regularly updated data services. Please [contact us](/about) for further information.