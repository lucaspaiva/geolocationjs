var PointList = [
				{
					"latlng"		:[-34.60297614585056,-58.404693603515625],
					"lat" 			:"-34.60297614585056",
					"lng"			:"-58.404693603515625",
					"title"			:"Punto 1",
					"subtitle"		:"Subtitulo de punto 1",
					"description"	:"Este es el primer punto del mapa"
				},
  				{
  					"latlng"		:[-34.61879975173952,-58.38340759277344],
  					"lat" 			:"-34.60297614585056",
					"lng"			:"-58.404693603515625",
  					"title"			:"Punto 2",
  					"subtitle"		:"Subtitulo de punto 2",
  					"description"	:"Este es el segundo punto del mapa"
  				},
  				{
  					"latlng"		:[-34.61653942126619,-58.41087341308594],
  					"lat" 			:"-34.60297614585056",
					"lng"			:"-58.404693603515625",
  					"title"			:"Punto 3",
  					"subtitle"		:"Subtitulo de punto 3",
  					"description"	:"Este es el tercer punto del mapa"
  				},
  				{
  					"latlng"		:[-34.59280223530828,-58.458251953125],
  					"lat" 			:"-34.60297614585056",
					"lng"			:"-58.404693603515625",
  					"title"			:"Punto 4",
  					"subtitle"		:"Subtitulo de punto 4",
  					"description"	:"Este es el cuarto punto del mapa"
  				},
  				{
  					"latlng"		:[-35.169318036011305,-57.69195556640625],
  					"lat" 			:"-34.60297614585056",
					"lng"			:"-58.404693603515625",
  					"title"			:"Punto 11",
  					"subtitle"		:"Subtitulo de punto 11",
  					"description"	:"lorempixel 11"
  				},


];

var infoWnd, mapCanvas;

function initMap()
{
	var mapProp = {
		center: new google.maps.LatLng(-34.60297614585056,-58.404693603515625),
		zoom: 20	
		};

	//Seteo el div donde voy a renderizar el mapa
	var mapDiv = document.getElementById("googleMap");
	//Instancio el canvas de googlemaps
	//mapCanvas = new google.maps.Map(mapDiv,mapProp);
	mapCanvas = new google.maps.Map(mapDiv);
	//Instancion una ventana de informacino de googlemaps
	infoWnd = new google.maps.InfoWindow();

	//Mapeo los marcadores en el mapa
	//TODO: Ver que hace esto de LatLngBounds();
	var bounds = new google.maps.LatLngBounds();
		var point, i, latlng;
		for (i in PointList) {
	    //Creo los markers de acuerdo a la lista que cree antes
	    point = PointList[i];
	    latlng = new google.maps.LatLng(point.latlng[0], point.latlng[1]);
	    bounds.extend(latlng);

	    //TODO: Para la imagen de perfil usar lorempixel

	    var contentString = '<div id="content_point">' +      
							'<h1>' + point.title + '</h1>' +
							'<div id="body_pint">' +
							'<p>' + point.description +'</p>' +
							'</div>' +
							'</div>';

	    var marker = createMarker(
	      mapCanvas, latlng, point.title, contentString
	    );
	}

	mapCanvas.fitBounds(bounds);    
}

//Funcion generica que crea los markers
function createMarker(map, latlng, title, contentString) {
	//Creates a marker
	var marker = new google.maps.Marker({
	position : latlng,
	map : map,
	title : title
	});

	//The infoWindow is opened when the sidebar button is clicked
	google.maps.event.addListener(marker, "click", function(){
	//infoWnd.setContent("<strong>" + title + "</title>");
	infoWnd.setContent(contentString);
	infoWnd.open(map, marker);
	});
	return marker;
}

//google.maps.event.addDomListener(window, 'load', initMap);


function bindGoogleMaps(){
	google.maps.event.addDomListener(window, 'load', initMap);
}



/*
if (navigator.geolocation)
{
	// Código de la aplicación
	navigator.geolocation.getCurrentPosition(function(objPosition)
		{
			var lon = objPosition.coords.longitude;
			var lat = objPosition.coords.latitude;

			console.log("long: " + lon);
			console.log("lat: " + lat);

		}, function(objPositionError)
		{
			switch (objPositionError.code)
			{
				case objPositionError.PERMISSION_DENIED:
					console.log("No se ha permitido el acceso a la posición del usuario.");
				break;
				case objPositionError.POSITION_UNAVAILABLE:
					console.log("No se ha podido acceder a la información de su posición.");
				break;
				case objPositionError.TIMEOUT:
					console.log("El servicio ha tardado demasiado tiempo en responder.");
				break;
				default:
					console.log("Error desconocido.");
			}
		}, {
			enableHighAccuracy : true,
			maximumAge: 75000,
			timeout: 15000
		});
}
else
{
	console.log("no hay geolocalizacion");
	// No hay soporte para la geolocalización: podemos desistir o utilizar algún método alternativo
}
*/