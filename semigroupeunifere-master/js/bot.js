let accessible = true;
let randint = m => {return Math.floor((Math.random() * m));};

function processWithDictionaries(str){
	str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
	str = str.toLowerCase()

	let outputText = "";
	workDone = false
	if(!accessible){outputText  = "Gustave s'est barré !"; workDone = true}

	let NoSteuplé = ["WOOOO tu te calmes tout de suite : je suis pas ton chien !!!", "Et le mot magique !!!", "Et la politesse ?", "lalalalalala G pa konpri"]
	let InsulteDetected = ["Non mais oh !", "  ><  ", "je le prends personnelement..."]
	let ResponseBonjour = ["Salut, moi c'est Gustave.\nDemande moi de l'aide :D", "Bonjour, ici Gustave, tu peux me demander de l'aide avec le mot clef 'aide' !"]

	let parsed = str.split(" ");
	$.get('data/dicos/synonymes', function(dataSyno) {
		let synonymes = dataSyno.split("\n").map( el => el.split(" / "));
		$.get('data/dicos/mots', function(dataMots) {
			let mots = dataMots.split("\n");

			parsed = parsed
				.map(el => {
					for(let i=0;i<synonymes.length;i++)
						for(let j=0;j<synonymes[i].length;j++)
							if(el == synonymes[i][j] || el == synonymes[i][j]+"s" || el == synonymes[i][j]+"x")
								return mots[i];
					return "";})
				.filter(el => el != "");

				//console.log(parsed)

				if(parsed.indexOf("bonjour") != -1 && !workDone){
					outputText = ResponseBonjour[randint(ResponseBonjour.length)]
					workDone = true
				}

				if(parsed.indexOf("insulte") != -1 && !workDone){
					outputText = InsulteDetected[randint(InsulteDetected.length)]
					outputText += "\nBon... je me casse alors !"
					accessible = false;
					workDone = true
					setTimeout(function(){accessible = true}, 0.5*60*1000) // 30sec
				}

				if(parsed.indexOf("stp") == -1 && !workDone){
					outputText = NoSteuplé[randint(NoSteuplé.length)]
					workDone = true
				}

				if(parsed.indexOf("aide") != -1 && !workDone){
					outputText = "Je suis un chatbot qui fonctionne grâce à des mots clefs. Cela signifie que certaines phrases peuvent faire des choses... étranges...\nVous pouvez faire des commandes en rapport avec les modules que vous avez implementé ;)"
					workDone = true
				}

				if(parsed.indexOf("temperature") != -1 && !workDone){
					let info = getWeather(mylat, mylon);
					let temp = info.list[0].main.temp - 273.15;
					let ville  = info.city.name;
					if(ville) outputText = "La température dans la ville de " +ville+ " est de " +temp.toFixed(2)+" °C.";
					else outputText = "La température est de " +temp+" °C."
					workDone = true
				}

				if(!workDone){
					outputText = "Je ne comprend aucun mot de votre requete...\nMais vous etes polis : c'est déjà pas mal :)\nps:l'implementation est toujours en cours..."
				}
				
				//console.log(outputText)
				document.getElementById('resultatBot').innerHTML += "<br>" + "<img src='data/ChouetteAiles.png' height='32px' width='32px' />" + outputText;

		});
	});
}

function runBot(){
	str = document.getElementById('inputChatbot').value
	//console.log(str)
	document.getElementById('resultatBot').innerHTML += "<br> > " + str;
	document.getElementById('inputChatbot').value = ''
	processWithDictionaries(str);
}

htmlModuleBot ="<div id='divBot'><p id='resultatBot'>ICI UN BOT EST A VOTRE ECOUTE</p> <br>	<input id='inputChatbot' type='text' /><input type='button' value='send' onclick='runBot()'></div>"

