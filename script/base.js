// to-do:
// leaflet-hash = permalinks
// list of breweries
// show & hide list of breweries
// nav permalinks
// logo

// zoom styling
// tilemill?




// set access token
L.mapbox.accessToken = 'pk.eyJ1IjoibWV6em9ibHVlIiwiYSI6IlpvbExZUncifQ.FQxaqWQaK6VcOg05GUHIPg';

// create map
// setView: [lat, long], zoom level 
var map = L.mapbox.map('map', 'mezzoblue.map-0311vf6d')
    .setView([46, -107.215], 4);

var mapIcons = setMediumIcons();


// load in GeoJSON data
var abSrc = JSON.parse(readJSON('../canadian-craft-breweries/alberta.geojson'));
var bcSrc = JSON.parse(readJSON('../canadian-craft-breweries/bc.geojson'));
var mbSrc = JSON.parse(readJSON('../canadian-craft-breweries/manitoba.geojson'));
var nbSrc = JSON.parse(readJSON('../canadian-craft-breweries/newbrunswick.geojson'));
var nlSrc = JSON.parse(readJSON('../canadian-craft-breweries/newfoundlandlabrador.geojson'));
var nsSrc = JSON.parse(readJSON('../canadian-craft-breweries/novascotia.geojson'));
var onSrc = JSON.parse(readJSON('../canadian-craft-breweries/ontario.geojson'));
var peiSrc = JSON.parse(readJSON('../canadian-craft-breweries/pei.geojson'));
var qcSrc = JSON.parse(readJSON('../canadian-craft-breweries/quebec.geojson'));
var skSrc = JSON.parse(readJSON('../canadian-craft-breweries/saskatchewan.geojson'));
var yukonSrc = JSON.parse(readJSON('../canadian-craft-breweries/yukon.geojson'));
var rumourSrc = JSON.parse(readJSON('../canadian-craft-breweries/upcoming-rumoured.geojson'));
var closedSrc = JSON.parse(readJSON('../canadian-craft-breweries/defunct.geojson'));


// fetch the nav object, we're gonna start filling it up
var nav = document.getElementById('nav');

// get layers onto the map and attach them to nav items
createLayer(abSrc, 'Alberta', nav, true);
createLayer(bcSrc, 'BC', nav, true);
createLayer(mbSrc, 'Manitoba', nav, true);
createLayer(nbSrc, 'New Brunswick', nav, true);
createLayer(nlSrc, 'Newfoundland &amp; Labrador', nav, true);
createLayer(nsSrc, 'Nova Scotia', nav, true);
createLayer(onSrc, 'Ontario', nav, true);
createLayer(peiSrc, 'PEI', nav, true);
createLayer(qcSrc, 'Quebec', nav, true);
createLayer(skSrc, 'Saskatchewan', nav, true);
createLayer(yukonSrc, 'Yukon', nav, true);
createLayer(rumourSrc, 'Rumours', nav, false);
createLayer(closedSrc, 'Closed', nav, false);

// kill scrolling
disableScrolling();

// add the menu collapse widget
addCollapse('site-header');








// // create a new feature layer and add it to the map
// var featureLayer = L.mapbox.featureLayer().addTo(map);

// // load in geoJSON for feature layer
// featureLayer.loadURL('../canadian-craft-breweries/bc.geojson');


// var featureLayer = L.mapbox.featureLayer(geojson)
//     .addTo(map);
// // a simple GeoJSON featureset with a single point
// // with no properties
// featureLayer.setGeoJSON({
//     type: "FeatureCollection",
//     features: [{
//         type: "Feature",
//         geometry: {
//             type: "Point",
//             coordinates: [102.0, 0.5]
//         },
//         properties: { }
//     }]
// });




// Since featureLayer is an asynchronous method, we use the `.on('ready'`
// call to only use its marker data once we know it is actually loaded.
// L.mapbox.featureLayer(myObject).on('ready', function(e) {
    // // The clusterGroup gets each marker in the group added to it
    // // once loaded, and then is added to the map
    // var clusterGroup = new L.MarkerClusterGroup();
    // e.target.eachLayer(function(layer) {
    //     clusterGroup.addLayer(layer);
    // });
    // map.addLayer(clusterGroup);
// });