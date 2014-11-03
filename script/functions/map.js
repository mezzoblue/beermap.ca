
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
        link.innerHTML = name + " (" + layer.features.length + ")";

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
