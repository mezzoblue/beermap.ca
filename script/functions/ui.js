
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
}