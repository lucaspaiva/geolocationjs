/*
 * GeoLocalizr.js: Metodo para dibujar varios puntos en un mapa de googlemaps
 * Author: Lucas Paiva		
 * Licencia: ?
 *
 */	

var path_app = 'geolocationjs/images/';
var path_images = 'http://' + window.location.host + '/' + path_app;

//Metodo que inicializa el mapa 
function initializeNewMap(locations,zoom){

	var map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: zoom,
      center: new google.maps.LatLng(locations[0]["lat"], locations[0]["lng"]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;	

    console.log("recorro locations")
    for (i = 0; i < locations.length; i++) {  
    	console.log(i)
		marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i]["lat"], locations[i]["lng"]),
		map: map,
		icon: path_images + locations[i]["icon-point"]
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

	console.log("inicializo mapa")
	   
}

//Metodo que valida geolocalizacion y obtiene coordenadas del usuario
function getGeolocalization(callback){

	console.log("Cargamos el mapa cuando cargue el DOM");

	if(navigator.geolocation){

		navigator.geolocation.getCurrentPosition(function(objPosicion){

			var latInit = objPosicion.coords.latitude;
			var lngInit = objPosicion.coords.longitude;
			
			console.log("Obtengo coordenadas");
			console.log("LNG: " + latInit);
			console.log("LAT: " + lngInit);

			//Inserto coordenadas del usuario al array de locations en primer lugar
			locations.splice(0, 0,
				    {
						"lat" 			: latInit,
						"lng"			: lngInit,
						"title"			: "Es mi punto",
						"description"	: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ",
						"email"			: "",
						"phone"			: "",
						"img"			: "",
						"link"			: "",
						"bg-color"		: "cornflowerblue",
						"icon-point"	: "my_location_96x96.png" 
					});

			return callback();

		},function(objError){

			switch(objError.code){
				case objError.POSITION_UNAVAILABLE:
					console.log("La información de su posición no está disponible.");
				break;
				case objError.TIMEOUT:
					console.log("Tiempo de espera agotado.");
				break;
				case objError.PERMISSION_DENIED:
				    console.log("Acceso denegado.")
				    return callback();
				break;
				case objError.UNKNOWN_ERROR:
					console.log("Error desconocido.");
					return callback();
				break;
			}
		});

	}else{
		//el navegador del usuario no soporta el API de Geolocalizacion de HTML5
		console.log("Su navegador no soporta Geolocalizacion");
		return callback();
	}

}

//Metodo que bindea el mapa
function bindGoogleMaps(points,zoom){
	google.maps.event.addDomListener(window, 'load', initializeNewMap(points,zoom));
}
