/*
 * GeoLocalizr.js: Metodo para dibujar varios puntos en un mapa de googlemaps
 * Author: Lucas Paiva		
 * Licencia: ?
 *
 */	

//TODO: tengo que crear un metodo para la geolocalizacion, luego dependiendo de  

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

	console.log("inicializo mapa")
	   
}

//Metodo que bindea el mapa
function bindGoogleMaps(points,zoom){
	google.maps.event.addDomListener(window, 'load', initializeNewMap(points,zoom));
}

//Metodo que valida geolocalizacion y obtiene coordenadas del usuario

function getGeolocalization(callback){

	console.log("Cargamos el mapa cuando cargue el DOM");

    //aca pongo el codigo de geo html5 ?
	if(navigator.geolocation){
		//intentamos obtener las coordenadas del usuario
		navigator.geolocation.getCurrentPosition(function(objPosicion){
			//almacenamos en variables la longitud y latitud
			geoFlag = 1;
			var latAuto = objPosicion.coords.latitude;
			var lngAuto = objPosicion.coords.longitude;
			
			console.log("Obtengo coordenadas");
			console.log("LNG: " + lngAuto);
			console.log("LAT: " + latAuto);

			console.log("antes de evaluar flag");
			if(geoFlag == 1){
				console.log("flag esta prenido");
				latInit = latAuto;
				lngInit = lngAuto;
				console.log("Agrego el elemento");
				
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
						"bg-color"		: "cornflowerblue" 
					});
			}
			console.log("despues de evaluar flag");
			return callback();

		},function(objError){
			//manejamos los errores devueltos por Geolocation API
			switch(objError.code){
				//no se pudo obtener la informacion de la ubicacion
				case objError.POSITION_UNAVAILABLE:
					geoFlag = 0;
					console.log("La información de su posición no está disponible.");
				break;
				//timeout al intentar obtener las coordenadas
				case objError.TIMEOUT:
					geoFlag = 0;
					console.log("Tiempo de espera agotado.");
				break;
				//el usuario no desea mostrar la ubicacion
				case objError.PERMISSION_DENIED:
					geoFlag = 0;
				    console.log("Acceso denegado.")
				    return callback();
				break;
				//errores desconocidos
				case objError.UNKNOWN_ERROR:
					geoFlag = 0;
					console.log("Error desconocido.");
					return callback();
				break;
			}
		});

	}else{
		//el navegador del usuario no soporta el API de Geolocalizacion de HTML5
		geoFlag = 0;
		console.log("Su navegador no soporta Geolocalizacion");
		return callback();
	}

	//return callback();

}

function pepe(){
	console.log("pepe")
}