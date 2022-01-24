function resize(){
	var isResize = false;
	var isDown = false;
	var variableTest = {};
	variableTest.down = false;
	variableTest.right = false;

	var div;
	var lastPosition = {};
	$(".resizable").mousemove(function(e){


		let currentMousePos = {};
		currentMousePos.x = e.pageX;
		currentMousePos.y = e.pageY;
		div = $("#"+this.getAttribute("id"));
		let pos = div.position();
		let width = div.width();
		let height = div.height();
		if(isRightPlace(pos,width,height,currentMousePos,div,variableTest)){
			isResize = true;
		}else{
			isResize = false;
		}
		if(isDown){
			div.addClass('resizing');
			console.log(div.height(),div.width());
			if(variableTest.right && variableTest.down){


				div.height(div.height()+(currentMousePos.y-lastPosition.y));
				div.width(div.width()+(currentMousePos.x-lastPosition.x));
			} else if (variableTest.right) {


				div.width(div.width()+(currentMousePos.x-lastPosition.x));
			}else if(variableTest.down){
	

				div.height(div.height()+(currentMousePos.y-lastPosition.y));
			}

			lastPosition = currentMousePos;
		}
	});

	$(".resizable").mousedown(function(e){
		if(isResize){
			isDown = true;			//div.height("")
		}
	});
	$(".resizable").mouseup(function(e){
		isDown = false;
		div.removeClass("resizing");
	});
};


function isRightPlace(pos,width,height,currentMousePos,div,variableTest){

	if(currentMousePos.y >= (pos.top+height-15) && currentMousePos.x >= (pos.left+width-15)){
		div.css('cursor', 'nwse-resize');
		variableTest.down = true;
		variableTest.right = true;
		return true;
	}
	else if(currentMousePos.y >= (pos.top+height-15)){
		div.css('cursor', 'ns-resize');
		variableTest.down = true;
		return true;
	}
	else if(currentMousePos.x >= (pos.left+width-15)){
		div.css('cursor', 'ew-resize');
		variableTest.right = true;
		return true;
	}
	else{
		div.css('cursor', 'pointer');
		variableTest.right = false;
		variableTest.down = false;
		return false;
	}
}

$(document).ready(resize)