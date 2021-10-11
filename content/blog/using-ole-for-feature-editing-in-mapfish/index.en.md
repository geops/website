---
title: Using OLE for Feature Editing in MapFish
summary: This article will show how to use OLE to provide feature editing and
  feature creation within MapFish. It does not rely on ExtJS and GeoExt that are
  often associated with MapFish. The result of the tutorial can be seen here.
created: 2011-10-24
slug: using-ole-for-feature-editing-in-mapfish
tags:
  - developers
published: true
---

This article will show how to use OLE to provide feature editing and feature creation within MapFish. For the sake of simplicity it will not include ExtJS or GeoExt that are often associated with MapFish. The result of the tutorial can be seen [here](http://ole.geops.de/mapfish).

- This tutorial assumes MapFish 2.2. The tutorial can be followed with any browser (even though MapFish's development mode only supports Firefox until 3.6 at the time of writing).
- OLE is the OpenLayers Editor developed by geOps. It is not packed with MapFish but can be easily used with it.
- The files which are created over the course of the tutorial can be found in a [git repository](https://github.com/geops/ole/tree/master/server/mapfish/).

## Preparing a MapFish Installation

First you need to set up a MapFish project. Thus the setup is briefly listed here or available in more detail in the [MapFish Getting Started documentation](http://www.mapfish.org/doc/2.2/installation.html). If you already have a MapFish installation running, you can safely [skip this section.](#mapfish_tutorial_client_side)

Download the installation script from http://www.mapfish.org/downloads/go-mapfish-framework-2.2.py which will be used to set up a python environment for use whith MapFish. The environment will contain the required dependencies and helper scripts. Invoke the installation as follows to create the environment in a folder called `env`.

    python go-mapfish-framework-2.2.py --no-site-packages env

Switch into the environment for all further steps:

    source env/bin/activate

We start by copying the `mapfish` template into `testapp`. `testapp` is an arbitrary name for your project. When asked for a template engine go with `mako` and answer that you want SQLAlchemy support.

    paster create -t mapfish testapp
    cd testapp

In case you want to access the application from another computer, you would need to specify your host name in the configuration `development.ini`:

    [server:main]
    use = egg:Paste#http
    # Replace this IP address with your own
    host = 192.168.0.1
    port = 5000

Now, start up the development server and verify you can access the empty application at [http://localhost:5000](http://localhost:5000).

    paster serve --reload development.ini

### Setting up the client side

We need a map which we use as editing surface later on. Place the following code in `public/index.html`.

```html
<!doctype html>
<html lang="en">
    <head>
        <title>OpenLayers Editor with MapFish</title>
        <meta http-equiv="Content-Type"
            content="text/html; charset=utf-8">
        <link rel="shortcut icon" href="favicon.ico"
            type="image/vnd.microsoft.icon">
        
        <!-- jQuery will be used for AJAX communication but you
            could use something else -->
        <script type="text/javascript"
            src="http://code.jquery.com/jquery-1.7.min.js">
        </script>
        
        <!-- Use a OpenLayers version later than 2.10 for supporting
            parallel script loading as in Firefox 4 and higher -->
        <script type="text/javascript"
            src="http://openlayers.org/api/2.11/OpenLayers.js">
        </script>
        
        <!-- Load OLE, the OpenLayers Editor, into your page -->
        <link rel="stylesheet" href="lib/geosilk/geosilk.css"
            type="text/css">
        <script type="text/javascript" src="lib/loader.js">
        </script>
        
        <!-- Code follows to instantiate the map with OLE and
            binding the client to MapFish via GeoJSON -->
        <script type="text/javascript">
        if(!window.console){
            window.console = {
                log: function(){
                    // Fake console.log for browsers that don't
                    // support it natively
                }
            };
        }
        
        function init() {
            // Implementation follows
        }
        
        // Initialize map on DOMContentLoaded
        $(document).ready(function(){
            init();
        });
        </script>
        <link rel="stylesheet" href="app/css/style.css"
            type="text/css">
        <script type="text/javascript">
        // Initialize menu on DOMContentLoaded
        $(document).ready(function(){
            $('#navigation a').on('click', function(){
                var clickedLink = $(this);
                
                // Remove highlights
                $('#navigation a').removeClass('active');
                // Highlight clicked menu item
                clickedLink.addClass('active');
                
                // Show desired content and nothing else
                var desiredContentId = clickedLink.attr('href')
                    .substring(1);
                $('#'+desiredContentId).show();
                $('.content').not('#'+desiredContentId).hide();
            });
        });
        </script>
    </head>
    <body>    
        <div id="page">
            <ul id="navigation">
                <li><a href="#map" class="active">Map</a></li>
                <li><a href="#video">Video</a></li>
            </ul>
            <!-- The map with the editor goes in here -->
            <h1>OpenLayers Editor with MapFish</h1>
            <!-- OLE in use within a geOps made application -->
            <div id="map" class="content"></div>
            <div id="video" class="content"
                style="display:none;">
                <iframe style="margin-left: 80px;" width="640"
                    height="480"
                    src="http://www.youtube-nocookie.com/embed/eJQIN7j2r9o?hd=1"
                    frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
        <div id="credit">developed by <a
            href="https://www.geops.de"><img src="geops.png"
            alt="geOps"></a></div>
    </body>
</html>
```

Add the required libraries once the empty page is in place. OLE can be found at [https://github.com/geops/ole](https://github.com/geops/ole) along with a sample implementation for a server. In order to use OLE with MapFish it will be enough to get the files from [https://github.com/geops/ole/tree/master/client/lib](https://github.com/geops/ole/tree/master/client/lib) and place them in `public/lib`. Additionally, place [https://github.com/geops/ole/tree/master/client/theme/geosilk](https://github.com/geops/ole/tree/master/client/theme/geosilk) into `public/lib/geosilk`.

Add the following code to `public/index.html` to test everything is functional. It should give a map with editing capabilities. However persistence, translations and some tools that rely on a server will not yet be functional.

```javascript
function init() {
    var map, editor;
    // Create an OpenLayers map
    map = new OpenLayers.Map('map', {
        maxExtent: new OpenLayers.Bounds(-500,-500, 500, 500)
    });
    // Add OpenStreetMap to have a base layer
    map.addLayer(new OpenLayers.Layer.OSM());
    // Set some default location and zoom level
    map.setCenter(new OpenLayers.LonLat(10, 50), 5);

    // Create an OLE instance
    editor = new OpenLayers.Editor(map, {
        // Choose which tools shall be available
        activeControls: [
            'Navigation', 'SnappingSettings', 'Separator',
            'SplitFeature', 'MergeFeature', 'CleanFeature',
            'DeleteFeature', 'SelectFeature', 'Separator',
            'DragFeature', 'DrawHole', 'ModifyFeature', 'Separator'
        ],
        // Choose which feature types shall be available
        featureTypes: ['polygon', 'path', 'point']
    });

    // Make a toolbar appear so that the user can start to edit
    editor.startEditMode();

    // Implementation of binding OLE to the MapFish powered server
    // follows
}
```

### Persistence and GeoJSON API

After the initial client code for basic editing is in place it is time to take care about the server side to provide persistence. We tested this tutorial using a [PostgreSQL](http://www.postgresql.org/) server with [PostGIS](http://postgis.refractions.net/), but other databases should work equally well. The tables within the database will be created by MapFish's scripts and so will the GeoJSON API.

First make your database known to MapFish in `development.ini`. Change the line starting with `sqlalchemy.url` to point to your server.

Then layers need to be added. Separate layers will be created for point, line and area features. The layer names are just examples and you could choose other names as well. Add the following lines to `layers.ini`:

```ini
[areas]
singular=area
plural=areas
table=areas
epsg=4326
geomcolumn=the_geom
geomtype=Polygon

[lines]
singular=line
plural=lines
table=lines
epsg=4326
geomcolumn=the_geom
geomtype=LineString

[points]
singular=point
plural=points
table=points
epsg=4326
geomcolumn=the_geom
geomtype=Point
```

Now, you can create model classes and controllers with a simple script call.

    paster mf-layer areas
    paster mf-layer lines
    paster mf-layer points

_The script can only be used to initially create the models and controllers. If you need to modify the table schemes later on you would have to do this manually._

This created 3 files in the `model` folder and 3 files in `controllers`. The controllers can be used as they are but the models need to be slightly amended. Leave the models for now and add routes so that the controllers are publicly available in `config/routing.py`.

```python
map.connect("/areas/count", controller="areas", action="count")
map.resource("area", "areas")

map.connect("/lines/count", controller="lines", action="count")
map.resource("line", "lines")

map.connect("/points/count", controller="points", action="count")
map.resource("point", "points")
```

The generated controllers implement a [GeoJSON](http://geojson.org/) based API which is further described in the [MapFish Wiki](http://trac.mapfish.org/trac/mapfish/wiki/MapFishProtocol). Since we are going to use this GeoJSON API we are done with the controllers now and can start adding the needed database tables.

You want to amend **all** the model classes according to the same scheme now. That is adding an import for `geoalchemy.GeometryDDL` and calling it at the files' end. Remove the `__table_args__` attributes and add a primary key to each model class. For example the model for the area features will end up looking like the following:

```python
# -*- coding: utf-8 -*-

from sqlalchemy import Column, types

from geoalchemy import GeometryColumn, Polygon, GeometryDDL

from mapfish.sqlalchemygeom import GeometryTableMixIn
from testapp.model.meta import Session, Base

class Area(Base, GeometryTableMixIn):
    __tablename__ = 'areas'
    # The following fragment needed to be commented out in order to
    # make table creation succeed from: paster setup-app development.ini
    # Additionally, this file needs to be imported in websetup.py
    #__table_args__ = {
    #    "autoload": True,
    #    "autoload_with": Session.bind
    #}

    # A primary key column is required by SQLAlchemy to create DDL
    # statements
    id = Column(types.Integer, primary_key=True)
    the_geom = GeometryColumn(Polygon(srid=4326))

# Triggers SQLAlchemy's DDL statement creation
GeometryDDL(Area.__table__)
```

Edit your `websetup.py` and import your model classes to make them known to [SQLAlchemy](http://www.sqlalchemy.org/), the OR mapper used by MapFish.

    from testapp.model import areas, lines, points

The tables in the database can now be generated by calling

    paster setup-app development.ini

_As already mentioned above also this script is only able to create and not to modify the tables_

Verify that the GeoJSON API is present and working by trying to download data using your browser. Just point it to `192.168.0.1:5000/points` or whatever you've set in `development.ini`. Obviously no data has been added to the database so far thus you should get a JSON response without any geometries in there.

### Getting Persistence for OLE

The important thing left is binding OLE to the GeoJSON API. In other words everything is now there except the connection between client and server.

Add the following code into the already existing `init` function within `public/index.html` and mind the comments in the code to learn how it works.

```javascript
function init() {
    // Leave the code in here that is already present and append the
    // following code

    // A flag so that initial adding of features is not mistaken as
    // addition of new features
    var ignoreFeatureAdditions = false;
    // Conversions between GeoJSON and OpenLayers objects
    var geoJSON = new OpenLayers.Format.GeoJSON();

    /**
     * Maps feature classes to controllers. In a real application you
     * would create own feature classes for OpenLayers corresponding
     * to your controllers.
     * Will will just the mapping of a feature class to a controller
     * for the sake of providing a simple tutorial.
     * @param {OpenLayers.Feature.Vector} feature The feature for
     *     which the controller should be returned
     * @return {string} Name of controller
     */
    function getControllerForFeature(feature){
        if(feature.geometry instanceof OpenLayers.Geometry.Polygon){
            return 'areas';
        } else if(feature.geometry instanceof
            OpenLayers.Geometry.LineString){
            
            return 'lines';
        } else {
            return 'points';
        }
    }

    /**
     * Adds or updates a feature. Chosen action depends on the
     * presence of a feature identifier.
     * @param {OpenLayers.Feature.Vector} feature The feature for
     *     which the controller should be returned
     */
    function saveFeature(feature){
        $.ajax({
            // Send to controller responsible for feature
            url: getControllerForFeature(feature),
            type: 'post',
            // Provide server with correct content type
            contentType: 'application/json',
            // Serialize OpenLayers feature to the format as expected
            // by MapFish's generated controllers
            data: JSON.stringify({
                type: 'FeatureCollection',
                features: [
                    $.parseJSON(geoJSON.write(feature))
                ]
            })
        }).done(function(featureCollection){
            // Update the OpenLayers feature in the map with the
            // feature identifier that is newly created on the server
            // on feature addition. Just take the first element since
            // we know there is only one.
            feature.fid = featureCollection.features[0].id;
            console.log('Saved object');
        });
    }

    // Register event handler so that our code gets notified about new
    // elements on the map
    editor.editLayer.events.register('featureadded', this,
        function(object, element) {
            if(ignoreFeatureAdditions){
                // Do nothing during initial population of the map
                // with features
                return;
            }
            // Persist the added feature
            saveFeature(object.feature);
        }
    );
    // Register event handler so that our code gets notified about
    // elements deleted from the map
    editor.editLayer.events.register('featureremoved', this,
        function(object, element) {
            // Convert OpenLayers feature to GeoJSON
            var feature = $.parseJSON(geoJSON.write(object.feature));
            $.ajax({
                // Send to controller responsible for feature deletion
                // and pass feature identifier
                url: getControllerForFeature(object.feature)+'/'
                    +feature.id,
                // Use correct HTTP method
                type: 'delete'
            }).done(function(){
                console.log('Deleted feature', object)
            });
        }
    );
    // Register event handler so that our code gets notified about
    // altered elements on the map
    editor.editLayer.events.register('afterfeaturemodified', this,
        function(object, element) {
            // Persist new geometry
            saveFeature(object.feature);
        }
    );

    /**
     * Adds features to map
     * @param {object} data Server's response after parsing as JSON
     */
    function addFeaturesToMap(data){
        var features = JSON.stringify(data);
        ignoreFeatureAdditions = true;
        // Add features for editing
        editor.editLayer.addFeatures(geoJSON.read(features));
        ignoreFeatureAdditions = false;
    }
    // Send AJAX requests for reading the persistent storage,
    // that's retrieving features from database
    $.ajax({
        url: 'areas'
    }).done(addFeaturesToMap);
    $.ajax({
        url: 'lines'
    }).done(addFeaturesToMap);
    $.ajax({
        url: 'points'
    }).done(addFeaturesToMap);
}
```

### Preparing Advanced Editing Tools

OLE supports some spatial operations that rely on a server backend to carry out the calculations. Namely these operations are cleaning features, merging features and cutting features along a path. We use PostGIS functions for it. If you don't need these features you may ignore this section.

To support advanced editing you need more controller and helper functions. Just copy the controller [process](https://github.com/geops/ole/tree/master/server/mapfish/testapp/controllers/process.py) to your `controllers` directory and [the helper module](https://github.com/geops/ole/tree/master/server/mapfish/testapp/lib/editor/) to `testapp/lib/`.

### Wrap Up

The tutorial showed how MapFish's generated GeoJSON API can be used with sophisticated editing of map features. It presented how OLE can be easily used with MapFish. Other examples show the use of more backends like the [PHP-Framework Zend](https://github.com/geops/ole/tree/master/server/zend) or the [CMS Drupal](https://github.com/geops/ole/tree/master/server/drupal). The nice thing about MapFish is the ready to use GeoJSON API and the ability to quickly create a simple application stub. However depending on your needs other backends may be favorable.
