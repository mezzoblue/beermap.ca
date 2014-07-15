// to-do:
// leaflet-hash = permalinks
// show & hide legend
// list of breweries
// show & hide list of breweries
// nav permalinks
// logo

// zoom styling
// tilemill?




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











// create map object

// setView: [lat, long], zoom level 
var map = L.mapbox.map('map', 'mezzoblue.map-0311vf6d').setView([46, -107.215], 4);

// load each data file into its own marker layer
var mainLayer = L.mapbox.markerLayer()
    .loadURL('../canadian-craft-breweries/canadian-craft-breweries.geojson');

var rumourLayer = L.mapbox.markerLayer()
    .loadURL('../canadian-craft-breweries/upcoming-rumoured.geojson');

var defunctLayer = L.mapbox.markerLayer()
    .loadURL('../canadian-craft-breweries/defunct.geojson');

// then set one for default load
var currentLayer = mainLayer;
toggleLayers(currentLayer);


// set default UI clearance value for desktop
var clearUI = 300;

// test for smaller breakpoints, vary UI clearance
var mq1 = window.matchMedia( "(max-width: 768px)" );
if (mq1.matches) {
    clearUI = 180;
}
var mq2 = window.matchMedia( "(max-width: 480px)" );
if (mq2.matches) {
    clearUI = 120;
}



// then resize map to fit
currentLayer.on('ready', function() {
    // currentLayer.getBounds() returns the corners of the furthest-out markers,
    // and map.fitBounds() makes sure that the map contains these.
    map.fitBounds(
        currentLayer.getBounds(),
        {
            // preserves the space from the left of the real map to account
            // for UI layer
            paddingTopLeft: [clearUI, 0]
        }
        );
});



// clear active classes from nav items
function cleanNav() {

	var elements = document.getElementById('nav').childNodes;

	for (var i = 0; i < elements.length; i++) {
		var obj = elements[i].firstElementChild;
		if (obj) {			
		    removeClass(obj, "active");
		}
	}
}



// click handlers for the nav

document.getElementById('nav-main').onclick = function() {
    if (this.className === 'active') {
        // return(false);
    } else {

    	// toggle map layers
    	currentLayer = mainLayer;
    	toggleLayers(currentLayer);

    	// toggle nav highlighting
    	cleanNav();
        toggleClass(this, 'active');
    }
};

document.getElementById('nav-rumours').onclick = function() {
    if (this.className === 'active') {
        // return(false);
    } else {

    	// toggle map layers
    	currentLayer = rumourLayer;
    	toggleLayers(currentLayer);

    	// toggle nav highlighting
    	cleanNav();
        toggleClass(this, 'active');
    }
};

document.getElementById('nav-defunct').onclick = function() {
    if (this.className === 'active') {
        // return(false);
    } else {

    	// toggle map layers
    	currentLayer = defunctLayer;
    	toggleLayers(currentLayer);

    	// toggle nav highlighting
    	cleanNav();
        toggleClass(this, 'active');
    }
};





// map layer toggle
function toggleLayers(layer) {
    map.removeLayer(mainLayer);
    map.removeLayer(rumourLayer);
    map.removeLayer(defunctLayer);

    map.addLayer(layer);
    map.invalidateSize(false);
}






// 
// 
// map markers
// 
// 

// Icon class
function IconClass() {
	this.brewery = "";
	this.brewpub = "";
	this.nano = "";
	this.other = "";
	this.unknown = "";
}

function setMediumIcons() {
	// define medium icons
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

// function setSmallIcons() {
// 	// define extra-small icons
// 	var Ico = L.Icon.extend({
// 	    options: {
// 		    iconSize: new L.Point(11, 11),
// 		    iconAnchor: new L.Point(5, 5),
// 		    popupAnchor: new L.Point(0, -5)
// 	    }
// 	});

// 	mapIcon = new IconClass();
// 	mapIcon.brewery = new Ico({iconUrl: 'images/brewery-sm.png'});
// 	mapIcon.brewpub = new Ico({iconUrl: 'images/brewpub-sm.png'});
//     mapIcon.nano = new Ico({iconUrl: 'images/nano-sm.png'});
//     mapIcon.other = new Ico({iconUrl: 'images/other-sm.png'});
//     mapIcon.unknown = new Ico({iconUrl: 'images/unknown-sm.png'});

// 	return mapIcon;
// }	

// function setXSmallIcons() {
// 	// define extra-small icons
// 	var Ico = L.Icon.extend({
// 	    options: {
// 		    iconSize: new L.Point(7, 7),
// 		    iconAnchor: new L.Point(3, 3),
// 		    popupAnchor: new L.Point(0, -3)
// 	    }
// 	});

// 	mapIcon = new IconClass();
// 	mapIcon.brewery = new Ico({iconUrl: 'images/brewery-xsm.png'});
// 	mapIcon.brewpub = new Ico({iconUrl: 'images/brewpub-xsm.png'});
//     mapIcon.nano = new Ico({iconUrl: 'images/nano-xsm.png'});
//     mapIcon.other = new Ico({iconUrl: 'images/other-xsm.png'});
//     mapIcon.unknown = new Ico({iconUrl: 'images/unknown-xsm.png'});

// 	return mapIcon;
// }	


var mapIcons = setMediumIcons();




// Add custom markers & popups to each using our custom feature properties

mainLayer.on('layeradd', function(e) {
	addMarkers(e);
});
rumourLayer.on('layeradd', function(e) {
	addMarkers(e);
});
defunctLayer.on('layeradd', function(e) {
	addMarkers(e);
});




// draw markers and bind custom popups
function addMarkers(e) {

    var marker = e.layer,
        feature = marker.feature;

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
	popupContent += 	'</div>';



    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 240
    });		
}




// once a zoom is finished, reset markers
map.on( "zoomend", function(e) {

	// var zoomLevel = map.getZoom();

	// if (zoomLevel < 4) {

	// 	console.log(zoomLevel);

	// 	mapIcons = setXSmallIcons();
	// 	toggleLayers(currentLayer);
	// }
	// if (zoomLevel >= 4) {
	// 	mapIcons = setMediumIcons();
	// 	// marker.setIcon(mapIcons);
	// 	toggleLayers(currentLayer);
	// }
});




// analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1556729-3']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();