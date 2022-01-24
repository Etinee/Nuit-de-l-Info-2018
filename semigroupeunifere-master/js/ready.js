$(document).ready(function(){
	drag()
	Object.keys(localStorage).forEach(function(key){
		create_module(key, JSON.parse(localStorage.getItem(key)))
	});
})
