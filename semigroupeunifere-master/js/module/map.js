
htmlModuleMap = "<div id=\"map\" class=\"smallmap\"></div>"

//implementation en cours...


var lat=45.7835; 
var lon=4.8747;
var zoom=16;
var map;

function initMap(){
    map = new OpenLayers.Map ("map", {
    controls:[
        new OpenLayers.Control.Navigation(),
        new OpenLayers.Control.PanZoomBar(),
        new OpenLayers.Control.Attribution()],
        maxResolution: 156543.0399,
        numZoomLevels: 19,
        units: 'm',
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    } );
    
    map.addLayer(new OpenLayers.Layer.OSM());

    var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

    map.setCenter (lonLat, zoom);
}