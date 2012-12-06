var pokerImage = new Image();
pokerImage.src = 'poker.png';
function init(){
	var windowHeight = $(window).height();
	var windowWidth = $(window).width()
	var stage = new Kinetic.Stage({
		container: 'container',
		width: windowWidth,
		height: windowHeight
	});
	var layer = new Kinetic.Layer();

	var poker = getPokerByIndex(2,1);
	var poker2 = getPokerByIndex(1,1);
	poker.on("mouseover", function(){
		this.setScale(1.2);
		stage.draw();
	});
	poker.on("mouseout", function(){
		this.setScale(1);
		stage.draw();
	});
	pokerImage.onload = function(){
		poker.setX(111);
		// add the shape to the layer
		layer.add(poker);
		layer.add(poker2);
		// add the layer to the stage
		stage.add(layer);
	};
	
	


	
	
	
}



/*
方片: x = 0
草花: x = 1
红桃: x = 2
黑桃: x = 3
王:   x = 4 (y = 0~1)
背面: x = 4 (y = 2~5)
*/
function getPokerByIndex(x, y){
	//pokerImage.onload = function() {
		var poker = new Kinetic.Image({
			image: pokerImage,
			x:0,
			y:0,
			width: 70,
			height: 95,
			crop: {
				x: 70*x,
				y: 95*y,
				width: 70,
				height: 95
			}
		});
	//};
	return poker;
}

