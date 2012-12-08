var pokerImage = new Image();
pokerImage.src = 'poker.png';
var stage;
var pokerArray = new Array();
var layerArray = new Array();

function init() {
	initConfig(config);
	initStageAndLayer();
	initPokerDataLayer();


//function getPokerArray(){
//	var pokers = new Array();
//	for (var i in pokers){
//		pokerDrawLayer.add(pokers[i]);
//		pokers[i].on("mouseover", function(){
//			this.setScale(1.1);
//			stage.draw();
//		});
//		pokers[i].on("mouseout", function(){
//			this.setScale(1);
//			stage.draw();
//		});
//	}
//	return pokers;
//}

function testPoker() {

	var message = [["hearts", 1], ["hearts", 2], ["back", 0]];
	var pokers = createPokersByMessage(message);
	addPokerArrayToLayer(pokers, layerArray["bottomLayer"])
	drawPokers(pokers, "bottom");
	stage.draw();
}



/*
 clean the stage
 */
function clearAll() {
	for (var i in layerArray) {
		if (i != "pokerDataLayer") {
			layerArray[i].removeChildren();
			layerArray[i].clear();
		}
	}
}



/*
 以center位置放置数组中的poker
 */
function drawPokers(pokers, position) {
	switch (position) {
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
		default:
			alert("错误：传入的position不对");
	}

	function drawPokersTopLeft(pokers) {
		var pokerTotal = pokers.length;
		if (pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
			var currentPosition = config["position"]["topLeftCenterWidth"] + totalLength / 2;
			for (var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(180);
				poker.setPosition(currentPosition, config["position"]["topLeftCenterHeight"]);
				currentPosition -= config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
			}
		}
	}

	function drawPokersTopRight(pokers) {
		var pokerTotal = pokers.length;
		if (pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
			var currentPosition = config["position"]["topRightCenterWidth"] + totalLength / 2;
			for (var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(180);
				poker.setPosition(currentPosition, config["position"]["topRightCenterHeight"]);
				currentPosition -= config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
			}
		}
	}

	function drawPokersBottom(pokers) {
		var pokerTotal = pokers.length;
		if (pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
			var currentPosition = config["position"]["bottomCenterWidth"] - totalLength / 2;
			for (var i in pokers) {
				var poker = pokers[i];
				poker.setPosition(currentPosition, config["position"]["bottomCenterHeight"]);
				currentPosition += config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
			}
		}
	}

	function drawPokersLeft(pokers) {
		var pokerTotal = pokers.length;
		if (pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
			var currentPosition = config["position"]["leftCenterHeight"] - totalLength / 2;
			for (var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(90);
				poker.setPosition(config["position"]["leftCenterWidth"], currentPosition);
				currentPosition += config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
			}
		}
	}

	function drawPokersRight(pokers) {
		var pokerTotal = pokers.length;
		if (pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * config["const"]["pokerWidth"] + config["const"]["pokerSpacing"] * (pokerTotal - 1);
			var currentPosition = config["position"]["rightCenterHeight"] + totalLength / 2;
			for (var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(-90);
				poker.setPosition(config["position"]["rightCenterWidth"], currentPosition);
				currentPosition -= config["const"]["pokerWidth"] + config["const"]["pokerSpacing"];
			}
		}
	}

}