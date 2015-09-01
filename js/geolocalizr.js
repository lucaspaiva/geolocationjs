/*
 * GeoLocalizr.js: Metodo para dibujar varios puntos en un mapa de googlemaps
 * Author: Lucas Paiva		
 * Licencia: ?
 *
 */	

var locations = [
				{
					"lat" 			: "-34.60297614585056",
					"lng"			: "-58.404693603515625",
					"title"			: "ORTOPEDIA AMERICANA",
					"description"	: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ",
					"email"			: "ortopedia_albada@yahoo.com.ar",
					"phone"			: "4647-9175",
					"img"			: "http://lorempixel.com/140/50/",
					"link"			: "http://"
				},
  				{
  					"lat" 			: "-34.61879975173952",
					"lng"			: "-58.38340759277344",
  					"title"			: "OPTICA AROZENA",
  					"description"	: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ",
  					"email"			: "ortopedia_sirita@yahoo.com.ar",
					"phone"			: "4754-6705",
					"img"			: "http://lorempixel.com/140/50/",
					"link"			: "http://"
  				},
  				{
  					"lat" 			:"-34.61653942126619",
					"lng"			:"-58.41087341308594",
  					"title"			:"GOYA DENTAL",
  					"description"	: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ",
  					"email"			: "ortopedia_argentina@arnet.com.ar",
					"phone"			: "4734-2713",
					"img"			: "http://lorempixel.com/140/50/",
					"link"			: "http://"
  				},
  				{
  					"lat" 			:"-34.59280223530828",
					"lng"			:"-58.458251953125",
  					"title"			:"OPTICA BRAVO ORTOPEDIA",
  					"description"	: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ",
  					"email"			: "ortopedia_america@hotmail.com",
					"phone"			: "(0341) 4427520",
					"img"			: "http://lorempixel.com/140/50/",
					"link"			: "http://"
  				},
				]  				

function initializeNewMap(){

    console.log("Inicializo mapa")

    var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 11,
      center: new google.maps.LatLng(locations[0].lat,locations[0].lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    var bounds = new google.maps.LatLngBounds();

    for (i in locations) {
      //Creo los markers de acuerdo a la lista que se creo antes
      point = locations[i];	

      latlng = new google.maps.LatLng(point.lat, point.lng);
	  bounds.extend(latlng);

      var contentString = '<div id="content_point">' +      
							'<h1>' + point.title + '</h1>' +
							'<div id="body_print">' +
							'<p>' + point.description + '</p>' +
							'<div class="map_email"><strong>Email: </strong>' + point.email + '</div>' +
							'<div class="map_phone"><strong>Tel: </strong>' + point.phone + '</div>' +
							'<img src="' + point.img + '"></img>' +
							'</div>' +
							'</div>';

	  var marker = createMarker(
	      map, latlng, point.title, contentString
	    );

    }

    map.fitBounds(bounds);

}

//Funcion generica que crea los markers
function createMarker(map, latlng, title, contentString) {

	var marker = new google.maps.Marker({
	position : latlng,
	map : map,
	title : title
	});

	var infowindow = new google.maps.InfoWindow();

	google.maps.event.addListener(marker, "click", function(){
		infowindow.setContent(contentString);
		infowindow.open(map, marker);
		});

	return marker;
}


function bindGoogleMaps(){
	google.maps.event.addDomListener(window, 'load', initializeNewMap);
}
