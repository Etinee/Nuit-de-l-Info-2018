function drag(){
	var isClicked = false;
	var div;
	var origine = {};
	var posDivOrigine = {};

	$(".draggable").mousedown(function(e){
		let currentMousePos = {};
		currentMousePos.x = e.pageX;
		currentMousePos.y = e.pageY;
		origine = currentMousePos;
		isClicked = true;
		div = this;
		posDivOrigine = $("#"+this.getAttribute("id")).position();
	});

	$('body').mousemove(function(e){
		if(isClicked){
			let currentMousePos = {x:e.pageX, y:e.pageY};

			let dx = currentMousePos.x-origine.x
			let dy = currentMousePos.y-origine.y

			div.setAttribute('style', 'top:'+(posDivOrigine.top+dy)+'px;left:'+(posDivOrigine.left+dx)+'px');
		}

	});
	$(".draggable").mouseup(function(){
		isClicked = false;
		let save = {
			top: div.style.top,
			left: div.style.left,
			content: div.innerHTML
		}
		localStorage.setItem(div.getAttribute('id'), JSON.stringify(save));
	});

}

