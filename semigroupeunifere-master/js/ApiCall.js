//ajoutez les codes d'api directement ici comme ca on a tout dans le meme fichier
//du style : voir graphHopper

// api graphHopper
function getItineraire(depLat, depLong, arrLat, arrLong){
	return getApi( "https://graphhopper.com/api/1/route?point=" + 
					depLat + "," + depLong +
					"&point=" +
					arrLat + "," + arrLong +
					"&locale=fr&vehicle=foot&debug=true&key=d52acc18-341e-43a6-9c1e-dd8f1c859f8f&type=json&details=time&points_encoded=false&callback=?" )
}

function getWeather(lat, lon){
	return getApi( "https://api.openweathermap.org/data/2.5/forecast?lat=" + 
		lat + 
		"&lon=" + 
		lon +
		"&appid=dc9c2424394f68a287f82a0d7f49511f")
}

// check pour les fonctions du bot (acces au dicos)
if (!(window.File && window.FileReader && window.FileList && window.Blob)){
 	alert('Votre navigateur ne supporte pas le chatBot...');
}

function Get(yourUrl){
	var Httpreq = new XMLHttpRequest();
	Httpreq.open("GET",yourUrl,false);
	Httpreq.send(null);
	return Httpreq.responseText;          
}

function getApi(url){
	console.log(url)
	var json_obj = JSON.parse(Get(url));
	return json_obj;
}

let mylon;
let mylat;

navigator.geolocation.getCurrentPosition(function(position){
	mylat = position.coords.latitude;
	mylon = position.coords.longitude;
});