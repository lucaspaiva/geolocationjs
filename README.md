# geolocalizr.js

#ESPAÑOL
## Requerimientos:
* jQuery 2.x
* Api Key googlemaps - [Como obtenerlo](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=es)
* HTML 5 
* Nada mas ;) 

## Instalacion:
* Ubicar el archivo geolocalizr.js en la carpeta /js de tu proyecto .
* Llamar a geolocalir.js en el archivo htmls donde quieras mostrar el mapa. 
* Se requiere llenar un json con los datos de los puntos a mostrar: pro ej:
```javascript
var locations = [
				{
					"lat" 			: "-34.60297614585056", //latitud
					"lng"			: "-58.404693603515625", //longitud
					"title"			: "ORTOPEDIA AMERICANA", //titulo
					"description"	: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod ", // desripcion
					"email"			: "ortopedia_albada@yahoo.com.ar", //Email
					"phone"			: "4647-9175", //telefono
					"img"			: "imagen1.png", #imagen (debe estar en la carpeta images)
					"link"			: "http://",
					"bg-color"		: "cornflowerblue", 
					"icon-point"	: "red-point.png"
				}];
```
* Llamar a la funcion bindGoogleMaps() 
```javascript
$(document).ready(function() {

    getGeolocalization(function(){
		bindGoogleMaps(locations,13);
	});

});
```

#ENGLISH
##Requirements
