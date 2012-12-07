var pokerImage = new Image();
pokerImage.src = 'poker.png';
var pokerLayer = new Kinetic.Layer();
var stage;
var pokerArray = new Array();
var windowHeight = $(window).height()-70;
var windowWidth = $(window).width();
var crPokerCenterWidth = $(window).width()/2;
var crPokerCenterHeight = $(window).height()/4;
function init(){
	stage = new Kinetic.Stage({
		container: 'container',
		width: windowWidth,
		height: windowHeight
	});
	pokerLayer = new Kinetic.Layer();

	pokersToArray();

	pokersToStage();


}

function testPoker(){
	//pokerArray["hearts"][0].setPosition(crPokerCenterWidth, crPokerCenterHeight*3);
	var t=0;
	var x =0;
	for (var i in pokerArray){
			for (var j in pokerArray[i]){
				pokerArray[i][j].setPosition(t*5,x*5);
				t++;
				x++;
			}
		}
	stage.draw();
}

/*
将pokerArray中的poker初始化到stage的poker layer中，默认位置在（-100,-100）
*/
function pokersToStage(){
	pokerImage.onload = function(){
		// add the shape to the layer
		for (var i in pokerArray){
			for (var j in pokerArray[i]){
				pokerLayer.add(pokerArray[i][j]);
			}
		}
		//pokerLayer.add(pokerArray["back"][0]);
		// add the layer to the stage
		stage.add(pokerLayer);
	};
}

/*
将图片中的所有扑克初始化放到pokerArray中
*/
function pokersToArray(){
	var pokerColor = new Array("diamond","club","hearts","spade");
	for (var i in pokerColor){
		pokerArray[pokerColor[i]] = new Array();
		for(var j=0; j<13; j++){
			pokerArray[pokerColor[i]][j] = getPokerByIndex(j, i);
		}
	}
	pokerArray["back"] = new Array();
	pokerArray["back"][0] = getPokerByIndex(3,4);

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
			x:-100,
			y:-100,
			width: 70,
			height: 95,
			crop: {
				x: 70*x,
				y: 95*y,
				width: 70,
				height: 95
			},
			draggable: true
		});
	//};
	return poker;
}

