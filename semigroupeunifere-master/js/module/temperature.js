
htmlModuletemperature = "<br><p id=\"temperatureValue\"></p>"

function loadTemperature(){
	setTimeout(loadTemperatureBis, 30*1000)
}

function loadTemperatureBis(){
	let info = getWeather(mylat, mylon);
	let temp = info.list[0].main.temp - 273.15;
	let ville  = info.city.name;
	document.getElementById('temperatureValue').innerHTML = "ville : " +ville+ " <br> temperature : " +temp.toFixed(2)+" °C."
	setTimeout(loadTemperatureBis, 5*60*1000) // 5min
}