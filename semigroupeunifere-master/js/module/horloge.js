
var htmlModuleHorloge = "<canvas id=\"canvas\" width=\"250\" height=\"250\"></canvas>"

function loadHorloge(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var radius = canvas.height / 2;
	ctx.translate(radius, radius);
	radius = radius * 0.90
	setInterval(drawClock, 1000);

	function drawClock() {	//appel des fonctions
	    drawFace(ctx, radius);
	    drawNumbers(ctx, radius);
	    drawTime(ctx, radius);
	}

	function drawFace(ctx, radius){
		var grad; 	//déclaration de la variable grad
		ctx.beginPath();	//permet de différencier les différentes parties auquelles les fonctions de type couleur etc s'appliquent
		ctx.arc(0, 0, radius, 0, 2*Math.PI);
		ctx.fillStyle = 'white';	//fonction couleur
		ctx.fill();		//appel de la fonction couleur

		grad = ctx.createRadialGradient(0,0, radius*0.95, 0, 0, radius*1.05);	//créer le dégradé radiale
		grad.addColorStop(0, '#333');	//couleur du bord intérieur
		grad.addColorStop(0.5, 'white');	//couleur du centre
		grad.addColorStop(1, '#333');	//couleur du bord exterieur
		ctx.strokeStyle = grad ;	//définition du contour en fonction de tout ce qui défini grad
		ctx.lineWidth = radius * 0.1;
		ctx.stroke();	//affichage du contour

		ctx.beginPath();
		ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);	//définition du petit cercle du centre
		ctx.fillStyle = '#333';		//couleur du disque
		ctx.fill();		//appel de la fonction couleur
	}

	function drawNumbers(ctx, radius){
		var num;	//déclaration de la variable num
		var ang;	//déclaration de la variable ang
		ctx.font = radius*0.15 + "px arial";	//définition de ... et de la police d'écriture
		ctx.textBaseline="middle";		
		ctx.textAlign="center";
		for(num= 1; num < 13; num++){	//boucle qui affiche les nombres
			ang = num * Math.PI / 6; 	//position du nombre à afficher
			ctx.rotate(ang);	
			ctx.translate(0, -radius*0.85);
			ctx.rotate(-ang);
			ctx.fillText(num.toString(), 0, 0);
			ctx.rotate(ang);
			ctx.translate(0, radius*0.85);
			ctx.rotate(-ang);
		}
	}

	function drawTime(ctx, radius){
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		//hour
		hour=hour%12;
		hour=(hour * Math.PI/6)+(minute * Math.PI/(6*60))+(second*Math.PI/(6*60*60));
		drawHand(ctx, hour, radius*0.5, radius*0.09);
		//minute
		minute=minute%60;
		minute=(minute * Math.PI/30);
		drawHand(ctx, minute, radius*0.65, radius*0.09);
		//second
		second=second%60;
		second=(second * Math.PI/30);
		drawHand(ctx, second, radius*0.7, radius*0.02);
	}

	function drawHand(ctx, pos, length, width){
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.rotate(pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(-pos);
	}
}
