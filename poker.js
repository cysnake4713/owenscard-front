var pokerImage = new Image();
pokerImage.src = 'poker.png';
var pokerLayer;
var stage;
var pokerArray = new Array();
var config = new Array();


/*
init config
*/
function initConfig(configArray){
	configArray["windowHeight"] = $(window).height()-65;
	configArray["windowWidth"] = $(window).width();
	configArray["position"] = new Array();
	configArray["position"]["bottomCenterWidth"] = configArray["windowWidth"]/2;
	configArray["position"]["bottomCenterHeight"] = configArray["windowHeight"]-100;
	
	configArray["position"]["leftCenterWidth"] = 0;
	configArray["position"]["leftCenterHeight"] = (configArray["windowHeight"]-100)/2;
	
	configArray["position"]["rightCenterWidth"] = configArray["windowWidth"]-110;
	configArray["position"]["rightCenterHeight"] = (configArray["windowHeight"]-100)/2;
	
	configArray["position"]["topLeftCenterWidth"] = configArray["windowWidth"]/4;
	configArray["position"]["topLeftCenterHeight"] = 0;
	
	configArray["position"]["topRightCenterWidth"] = (configArray["windowWidth"]/4)*3;
	configArray["position"]["topRightCenterHeight"] = 0;
}

function init(){
	initConfig(config);
	stage = new Kinetic.Stage({
		container: 'container',
		width: config["windowWidth"],
		height: config["windowHeight"]
	});


	pokersToArray();

	pokersToStage();


}

function testPoker(){
	pokerArray["hearts"][0].setPosition(config["position"]["bottomCenterWidth"], config["position"]["bottomCenterHeight"]);
	pokerArray["hearts"][1].setPosition(config["position"]["leftCenterWidth"], config["position"]["leftCenterHeight"]);
	pokerArray["hearts"][2].setPosition(config["position"]["rightCenterWidth"], config["position"]["rightCenterHeight"]);
	pokerArray["hearts"][3].setPosition(config["position"]["topLeftCenterWidth"], config["position"]["topLeftCenterHeight"]);
	pokerArray["hearts"][4].setPosition(config["position"]["topRightCenterWidth"], config["position"]["topRightCenterHeight"]);
	stage.draw();
}



/*
将pokerArray中的poker初始化到stage的poker layer中，默认位置在（-100,-100）
*/
function pokersToStage(){
	pokerLayer = new Kinetic.Layer();
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
		}
//		,draggable: true
	});
	return poker;
}

