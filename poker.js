var pokerImage = new Image();
pokerImage.src = 'poker.png';
var pokerLayer;
var stage;
var pokerArray = new Array();
var config = new Array();
var pokerDrawLayer = new Kinetic.Layer();

/*
init config
*/
function initConfig(configArray){
	configArray["const"] = new Array();
	configArray["const"]["bottom"] = "bottom";
	configArray["const"]["left"] = "left";
	configArray["const"]["right"] = "right";
	configArray["const"]["topLeft"] = "topLeft";
	configArray["const"]["topRight"] = "topRight";
	configArray["const"]["pokerWidth"] = 70;
	configArray["const"]["pokerHeight"] = 95;
	configArray["const"]["pokerSpacing"] = 10;
	
	configArray["windowHeight"] = $(window).height()-65;
	configArray["windowWidth"] = $(window).width();
	configArray["position"] = new Array();
	configArray["position"]["bottomCenterWidth"] = configArray["windowWidth"]/2;
	configArray["position"]["bottomCenterHeight"] = configArray["windowHeight"]-60;
	
	configArray["position"]["leftCenterWidth"] = 60;
	configArray["position"]["leftCenterHeight"] = (configArray["windowHeight"])/2;
	
	configArray["position"]["rightCenterWidth"] = configArray["windowWidth"]-80;
	configArray["position"]["rightCenterHeight"] = (configArray["windowHeight"])/2;
	
	configArray["position"]["topLeftCenterWidth"] = configArray["windowWidth"]/4+50;
	configArray["position"]["topLeftCenterHeight"] = 60;
	
	configArray["position"]["topRightCenterWidth"] = (configArray["windowWidth"]/4)*3-70;
	configArray["position"]["topRightCenterHeight"] = 60;
	
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

function getPokerArray(){
	var pokers = new Array();
	pokers.push(pokerArray["hearts"][1].clone());
	pokers.push(pokerArray["hearts"][2].clone());
	pokers.push(pokerArray["hearts"][3].clone());
	pokers.push(pokerArray["hearts"][4].clone());
	pokers.push(pokerArray["hearts"][5].clone());
	for (var i in pokers){
		pokerDrawLayer.add(pokers[i]);
		pokers[i].on("mouseover", function(){
			this.setScale(1.1);
			stage.draw();
		});
		pokers[i].on("mouseout", function(){
			this.setScale(1);
			stage.draw();
		});
	}
	return pokers;
}

function testPoker(){
	
	drawPokers(getPokerArray(),"right");
	drawPokers(getPokerArray(),"bottom");
	drawPokers(getPokerArray(),"left");
	drawPokers(getPokerArray(),"topRight");
	drawPokers(getPokerArray(),"topLeft");


	stage.add(pokerDrawLayer);
	stage.draw();
}

/*
以center位置放置数组中的poker
*/
function drawPokers(pokers, position){
	switch (position){
		case config["const"]["bottom"]:
			drawPokersBottom(pokers);
			break;
		case config["const"]["left"]:
			drawPokersLeft(pokers);
			break;
		case config["const"]["right"]:
			drawPokersRight(pokers);
			break;
		case config["const"]["topLeft"]:
			drawPokersTopLeft(pokers);
			break;
		case config["const"]["topRight"]:
			drawPokersTopRight(pokers);
			break;
		default:alert("错误：传入的position不对");
	}
}

function drawPokersTopLeft(pokers){
	var pokerTotal = pokers.length;
	if( pokerTotal > 0){
		var totalLength = (pokerTotal-1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
		var currentPosition = config["position"]["topLeftCenterWidth"] + totalLength / 2;
		for (var i in pokers){
			var poker = pokers[i];
			poker.rotateDeg(180);
			poker.setPosition(currentPosition, config["position"]["topLeftCenterHeight"]);
			currentPosition -= config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
		}
	}
}

function drawPokersTopRight(pokers){
	var pokerTotal = pokers.length;
	if( pokerTotal > 0){
		var totalLength = (pokerTotal-1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
		var currentPosition = config["position"]["topRightCenterWidth"] + totalLength / 2;
		for (var i in pokers){
			var poker = pokers[i];
			poker.rotateDeg(180);
			poker.setPosition(currentPosition, config["position"]["topRightCenterHeight"]);
			currentPosition -= config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
		}
	}
}

function drawPokersBottom(pokers){
	var pokerTotal = pokers.length;
	if( pokerTotal > 0){
		var totalLength = (pokerTotal-1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
		var currentPosition = config["position"]["bottomCenterWidth"] - totalLength / 2;
		for (var i in pokers){
			var poker = pokers[i];
			poker.setPosition(currentPosition, config["position"]["bottomCenterHeight"]);
			currentPosition += config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
		}
	}
}

function drawPokersLeft(pokers){
	var pokerTotal = pokers.length;
	if( pokerTotal > 0){
		var totalLength = (pokerTotal-1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
		var currentPosition = config["position"]["leftCenterHeight"] - totalLength / 2;
		for (var i in pokers){
			var poker = pokers[i];
			poker.rotateDeg(90);
			poker.setPosition(config["position"]["leftCenterWidth"], currentPosition);
			currentPosition += config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
		}
	}
}

function drawPokersRight(pokers){
	var pokerTotal = pokers.length;
	if( pokerTotal > 0){
		var totalLength = (pokerTotal-1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
		var currentPosition = config["position"]["rightCenterHeight"] + totalLength / 2;
		for (var i in pokers){
			var poker = pokers[i];
			poker.rotateDeg(-90);
			poker.setPosition(config["position"]["rightCenterWidth"], currentPosition);
			currentPosition -= config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
		}
	}
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
//		,draggable: true
	});
	poker.setPosition(-100,-100);
	poker.setOffset(70/2, 95/2);
	return poker;
}

