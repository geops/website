---
title: Worldwide Transit Tracker
summary: geOps has implemented a tracker of worldwide public transportation
  data. The application combines static and realtime schedule data and
  calculates the current position of the transport vehicles.
cover: /images/blog/worldwide-transit-tracker/travic_0.png
created: 2014-04-13
slug: worldwide-transit-tracker
tags:
  - mobility
  - realtime
  - passengerinformation
published: true
---

## More than 700 public transportation companies

In collaboration with the University of Freiburg, geOps has implemented [a tracker of public transportation data](http://tracker.geops.ch/?z=14&s=10&lat=40.723&lon=-74.002). The application combines static schedule data with possibly available realtime data and calculates the current position of the transport vehicles, no matter whether it is a train, a bus, a streetcar or a boat. The data is read from so-called GTFS-feeds. Currently more than 700 feeds from all over the world have been ingested into the tracker. Realtime data is for example available for [the Netherlands](http://tracker.geops.ch/?z=13&s=1&lat=52.36595686731005&lon=4.904365539550781) .

![](/images/blog/worldwide-transit-tracker/trackerbar.png)

If there are no real-time feeds for a specific region or if the real-time data is momentarily unavailable, the visualiziation falls back to the interpolated schedule positions of the vehicles. This is currently the case for most of the data. Even if real-time data is available it is possible to speed up the visualization. The vehicle positions are then based on the current delay and the schedule for the next hours.

The backend is optimized to show as many vehicle movements (trajectories) as possible in the shortest possible time. The server as well as the client have been newly developed from the ground during a [master thesis](http://ad-publications.informatik.uni-freiburg.de/theses/Master_Patrick_Brosi_2014.pdf) at the [University of Freiburg](https://ad.informatik.uni-freiburg.de/front-page-en?set_language=en). For use within the newly published tracker the ongoing software development has been taken over by geOps.

The server loads all available GTFS feeds at once. Thus, all vehicles within the current map extent can be shown simultaneously, even if data are provided from different transit operators and therefore from different data sources. The tracker is efficient enough to even provide acceleration by a factor of 30 while the movement of the vehicles still being very smooth.

### Mapping of Tracks

Besides the schedule, GTFS feeds may also contain precise track locations, so called "shapes". Movement visualization within the tracker normally relies on these shapes if they are available. Many feeds however lack the shapes information or only provide versions with insufficient precision. In order to also show these data on the map we developed special routing algorithms.

Starting point are the stations within a GTFS feed that contain location information in the form of coordinates. In combination with a topological network of railroad tracks and streets it is possible to derive the exact course of the connections between stations. Many special cases have to be considered in order to achieve a satisfactory solution. For the mapping of bus tracks, for instance, the routing is performed based on information about one-way streets, street categories and streets impassable for busses. Moreover, up to a certain degree, errors in the underlying road- and railway network are fixed automatically by the mapping algorithm. In the current version of the tracker (e.g. [bus, tram and train courses in Switzerland](http://tracker.geops.ch/?z=15&s=30&lat=47.37955096693522&lon=8.538994789123535)) are based on routing with OpenStreetMap data. However, despite a very sophisticated routing logic, there can still be errors in the routing. These errors should bestbe fixed in collaboration with the public transit operators. For Switzerland, a project pursuing this target is already in preparation.

![](/images/blog/worldwide-transit-tracker/trackeramsterdam.png)

### Further extensions

For the future we plan to extend the tracker with information from other transit operators. At least for Europe and North America it should be possible to achieve a comprehensive visualization of public transport traffic. We are happy to integrate further schedule data provided either by the operators themselves or as OpenData with the permission of the transit operators and agencies. Schedule data integrated in our tracker is protected against downloading. We want to stress that the visualization is not a journey planner with binding character.

If you have any questions regarding the mapping of schedule data or data provision as GTFS feeds, do not hesitate to contact us. We will be happy to provide our consultancy and implementation services for you and your data.

[Tweets about "tracker.geops"](https://twitter.com/search?q=tracker.geops) !function(d,s,id){var js,fjs=d.getElementsByTagName(s)\[0\],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
