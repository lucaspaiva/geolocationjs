/*
 * GeoLocalizr.js: Metodo para dibujar varios puntos en un mapa de googlemaps
 * Author: Lucas Paiva		
 * Licencia: ?
 *
 */	

function initializeNewMap(locations,zoom){

	var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: zoom,
      center: new google.maps.LatLng(locations[0]["lat"], locations[0]["lng"]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  

		marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i]["lat"], locations[i]["lng"]),
		map: map,
		icon: 'http://ktct.ca/images/gis/map_icon_poi.png'
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {

			var contentString = '<div id="containerInfoMap" style="width: 300px; height: 200px;">' +
				'<div class="img" style="text-align: center; background-color: ' + locations[i]["bg-color"] +';"><img src="' + locations[i]["img"]  + '"></img></div>' +
				'<div class="title" style="text-align: center;"><h3>' + locations[i]["title"] + '</h3></div>' +
				'<div class="description" style="text-align: center;">' +
				'<p>' + locations[i]["description"] + '</p>' +
				'</div>' +
				'<div class="phone" style="text-align: center;"><strong>Tel: </strong>' + locations[i]["phone"] + '</div>' +
				'<div class="email" style="text-align: center;"><strong>Email: </strong>' + locations[i]["email"] + '</div>' +
				'</div>';			            	

			infowindow.setContent(contentString);
			infowindow.open(map, marker);
		}
		})(marker, i));

    }
    
}

function bindGoogleMaps(points,zoom){
	google.maps.event.addDomListener(window, 'load', initializeNewMap(points,zoom));
}
