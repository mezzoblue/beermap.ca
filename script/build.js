// jQuery replacement functions
// taken from http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/
function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}
function toggleClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace( ' ' + className + ' ' , ' ' );
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    } else {
        elem.className += ' ' + className;
    }
}
function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

//
// position accepts 4 arguments: beforebegin, afterbegin, beforeend, afterend
//
function addHTML(elem, htmlString, position) {
    elem.insertAdjacentHTML(position, htmlString);
}


//
// replace contents of an element's class 
//
function setClass(elem, newClass) {
    elem.className = newClass;
};// read in JSON files
function readJSON(file) {
    var request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send(null);
    if (request.status == 200)
        return request.responseText;
};;
// Icon class
function IconClass() {
	this.brewery = "";
	this.brewpub = "";
	this.nano = "";
	this.other = "";
	this.unknown = "";
}


// define medium icons
function setMediumIcons() {
	var Ico = L.Icon.extend({
	    options: {
		    iconSize: new L.Point(23, 23),
		    iconAnchor: new L.Point(11, 11),
		    popupAnchor: new L.Point(0, -11)
	    }
	});

	mapIcon = new IconClass();
	mapIcon.brewery = new Ico({iconUrl: 'images/brewery.png'});
	mapIcon.brewpub = new Ico({iconUrl: 'images/brewpub.png'});
    mapIcon.nano = new Ico({iconUrl: 'images/nano.png'});
    mapIcon.other = new Ico({iconUrl: 'images/other.png'});
    mapIcon.unknown = new Ico({iconUrl: 'images/unknown.png'});

	return mapIcon;
}



// draw markers and bind custom popups
function addMarkers(layer) {
    var marker = layer,
        feature = marker.feature;


    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 240
    });		
}



// create a layer on the map
// and create a nav item for it
function createLayer(layer, name, nav, addNow) {

	var newLayer = L.geoJson(layer, {
	    style: function (feature) {
	        return {color: feature.properties.color};
	    },
	    onEachFeature: function (feature, layer) {

	        var marker = layer;
	        // customize markers based on type
	        if (feature.properties.Type == "Brewery") {
	            marker.setIcon(mapIcons.brewery);
	        } else if (feature.properties.Type == "Brewpub") {
	            marker.setIcon(mapIcons.brewpub);
	        } else if (feature.properties.Type == "Nanobrewery") {
	            marker.setIcon(mapIcons.nano);
	        } else if (feature.properties.Type == "Unknown") {
	            marker.setIcon(mapIcons.unknown);
	        } else if (
	            (feature.properties.Type == "Brewpub Chain") ||
	            (feature.properties.Type == "Contract Brewer") ||
	            (feature.properties.Type == "Gypsy Brewer") ||
	            (feature.properties.Type == "Training Brewery")
	            ) {
	            marker.setIcon(mapIcons.other);
	        }
	        // layer.bindPopup(feature.properties.Name);

	        // Create custom popup content
	        // (this is super ugly)
	        var popupContent =  '<div class="map-popup">';

	        // title of brewery
	        if (feature.properties.URL) {
	            popupContent += '<h2><a class="main-link" href="' + feature.properties.URL  + '">' + feature.properties.Name + '</a></h2>';
	        } else {
	            popupContent += '<h2>' + feature.properties.Name + '</h2>';
	        }

		    popupContent += 	'   <ul>';

		    if (feature.properties.AKA) {
			    popupContent += 	'   	<li class="aka">aka ' + feature.properties.AKA + '</li>';
			}

		    popupContent += 	'   	<li>' + feature.properties.City + ', ' + feature.properties.Province + '</li>';


			// conditional extra information

		    if (feature.properties.Note) {
				popupContent += 	'      <li class="note">' + feature.properties.Note  + '</li>';
			}

			popupContent += 	'      <li class="extra">';

		    if (feature.properties.Twitter) {
				popupContent += '<a class="twitter" href="' + feature.properties.Twitter  + '">T</a>';
			}
		    if (feature.properties.Facebook) {
				popupContent += '<a class="fb" href="' + feature.properties.Facebook  + '">F</a>';
			}
		    if ((feature.properties.Type) && (feature.properties.Type != "Unknown")) {
				popupContent += '<span class="type">' + feature.properties.Type + '</span>';
			}

			popupContent += 	'      </li>';

		    if (feature.properties.Closed) {
				popupContent += 	'      <li class="closed">Closed: ' + feature.properties.Closed  + '</li>';
			}

		    popupContent += 	'   </ul>';

	        popupContent +=     '</div>';

	        // http://leafletjs.com/reference.html#popup
	        marker.bindPopup(popupContent,{
	            closeButton: true,
	            minWidth: 240
	        }); 
	    }
	});



    if (addNow) {

		// add it to the map
        newLayer.addTo(map);

    }

    // create the link that controls each layer's display
    var link = document.createElement('a');
        link.href = '#';
        if (addNow) {
            link.className = 'active';
        }
        link.innerHTML = name;

    // add click handler to toggle the link's layer
    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        var newClass = toggleLayer(map, newLayer);
        setClass(this, newClass);
    };

    // create a parent li and drop in the link
    var li = document.createElement('li');
        li.className = 'nav-item';
        li.appendChild(link);

    nav.appendChild(li);

}


// show and hide a layer on the map
function toggleLayer(map, layer) {
    var className;
    if (map.hasLayer(layer)) {
        map.removeLayer(layer);
        className = '';
    } else {
        map.addLayer(layer);
        className = 'active';
    }
    return className;
}
;
// disable viewport scrolling
function disableScrolling() {
	document.addEventListener('touchmove', function(e) {
	    e.preventDefault();
	}, false);
}


// add collapse widget
function addCollapse(elem) {
	var navPanel = document.getElementById(elem);
	addHTML(navPanel, "<div class='nav-collapse' id='nav-collapse'></div>", "beforebegin");

	// wire up collapse widget click handler
	document.getElementById('nav-collapse').onclick = function() {

	    siteNav = document.getElementById(elem);
	    mapContainer = document.getElementById('map');

	    toggleClass(mapContainer, 'collapsed')
	    toggleClass(siteNav, 'collapsed')
	    toggleClass(this, 'collapsed');
	}
};// to-do:
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