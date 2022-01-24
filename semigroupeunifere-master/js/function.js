Array.from(document.getElementsByClassName('mod_list')).forEach(x => x.addEventListener('click', add_module))

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function create_module(id, object){
	module_object = object || { top: 0, left: 0, content: "" }

	let module_name = capitalize(id)//.replace(/-/g, " ")

	if(!document.getElementById(id)){
		let module = document.createElement("div");
		module.className = "draggable module resizable bg-dark"
		module.id = id
		module.style.top = module_object.top
		module.style.left = module_object.left
		let h2 = document.createElement("h2");
		let h2_text = document.createTextNode(module_name)
		let span_title = document.createElement("span");
		let span_cross = document.createElement("span");
		span_cross.className = "cross"
		span_title.className = "title"
		let cross = document.createTextNode("×")

		span_title.appendChild(h2_text)
		span_cross.appendChild(cross)

		h2.appendChild(span_title)
		h2.appendChild(span_cross)
		module.appendChild(h2)
		document.body.appendChild(module)

		
			module.children[0].children[1].addEventListener('click', remove_module)

		if(module_name == "Horloge"){
			module.innerHTML += htmlModuleHorloge;
			module.children[0].children[1].addEventListener('click', remove_module)
			loadHorloge();
		}


		if(module_name == "Chouettebot"){
			module.innerHTML += htmlModuleBot;
			module.children[0].children[1].addEventListener('click', remove_module)
		}


		if(module_name == "Temperature"){
			module.innerHTML += htmlModuletemperature;
			module.children[0].children[1].addEventListener('click', remove_module)
			loadTemperature();
		}
		if(module_name == "Map"){
			module.innerHTML += htmlModuleMap;
			module.children[0].children[1].addEventListener('click', remove_module)
			initMap();
		}

		if(module_object.content){
			module.innerHTML = module_object.content
			module.children[0].children[1].addEventListener('click', remove_module)
			if(id == "horloge") loadHorloge();
			if(id == "temperature") loadTemperature();
			if(id == "map") initMap();

		}
		drag()
		localStorage.setItem(id, JSON.stringify(module_object))
	}
}

function add_module(){

	let module_name = this.innerText
	let id = module_name.toLowerCase().replace(/\s/g, "")
	create_module(id)
}

function remove_module() {
	let module = this.parentNode.parentNode // on est dans span, donc on choppe le h2 puis le div.
	document.body.removeChild(module)
	localStorage.removeItem(module.getAttribute('id'))
}
