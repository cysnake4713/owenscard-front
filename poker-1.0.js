var Poker = {}
Poker.CONST = {
	BOTTOM : 'bottom',
	LEFT : 'left',
	RIGHT : 'right',
	TOPLEFT : 'topLeft',
	TOPRIGHT : 'topRight',
	POKER_WIDTH : 70,
	POKER_HEIGHT : 95,
	POKER_SPACING : 10,
	POKER_CLICK_UP_SPACING : 20,
	POKER_SHOW_SPACING : 20,

	POKER_COLOR : {
		DIAMOND : "diamond",
		CLUB : "club",
		HEARTS : "hearts",
		SPADE : "spade"
	}
}
Poker.Global = {
	WINDOW_HEIGHT : $(window).height() - 65,
	WINDOW_WIDTH : $(window).width()
}

Poker.Position = {

	Bottom : {
		centerX : Poker.Global.WINDOW_WIDTH / 2,
		centerY : Poker.Global.WINDOW_HEIGHT - 60
	},
	Left : {
		centerX : 60,
		centerY : Poker.Global.WINDOW_HEIGHT / 2
	},
	Right : {
		centerX : Poker.Global.WINDOW_WIDTH - 80,
		centerY : Poker.Global.WINDOW_HEIGHT / 2
	},
	TopLeft : {
		centerX : Poker.Global.WINDOW_WIDTH / 4 + 50,
		centerY : 60
	},
	TopRight : {
		centerX : (Poker.Global.WINDOW_WIDTH / 4) * 3 - 70,
		centerY : 60
	}
}

Poker.Builder = {
	init : function() {

	},

	/*
	 将图片中的所有扑克初始化放到pokerArray中
	 */
	initComopentPokerArray : function() {
		pokerColor = Poker.CONST.POKER_COLOR;
		for (var i in Poker.CONST.POKER_COLOR) {
			Poker.Component.Pokers[pokerColor[i]] = {}
			for (var j = 0; j < 13; j++) {
				Poker.Component.Pokers[pokerColor[i]][j] = getPokerByIndex(j, i);
			}
		}
		pokerArray["back"] = new Array();
		pokerArray["back"][0] = getPokerByIndex(3, 4);
	}
}

Poker.tools = {

	/*
	 将poker Image加入到指定Layer中
	 */
	addPokerArrayToLayer : function(pokers, layer) {
		for (var i in pokers) {
			layer.add(pokers[i]);
		}
	},

	/*
	 由数组message创建poker对象
	 */
	createPokersByMessage : function(message) {
		var result = new Array();
		for (var i in message) {
			var poker = Poker.Component.pokers[message[i][0]][message[i][1]].clone();
			result.push(poker);
		}
		return result;
	}
}
Poker.Component = {

	init : function() {
		Poker.Component.pokerImage = new Image();
		Poker.Component.stage = new Kinetic.Stage({
			container : 'container',
			width : Poker.Global.WINDOW_WIDTH,
			height : Poker.Global.WINDOW_HEIGHT
		});
		Poker.Component.pokers.init();
		for(var i in Poker.Component.Layers) {
			Poker.Component.Layers[i].init();
		}
		Poker.Component.pokerImage.src = 'poker.png';
	},
	pokers : {
		/*
		 方片: x = 0
		 草花: x = 1
		 红桃: x = 2
		 黑桃: x = 3
		 王:   x = 4 (y = 0~1)
		 背面: x = 4 (y = 2~5)
		 */

		getPokerByIndex : function(x, y) {
			var poker = new Kinetic.Image({
				image : Poker.Component.pokerImage,
				width : 70,
				height : 95,
				crop : {
					x : 70 * x,
					y : 95 * y,
					width : 70,
					height : 95
				}
				//		,draggable: true
			});
			poker.setPosition(-100, -100);
			poker.setOffset(70 / 2, 95 / 2);
			return poker;
		},
		init : function() {
			pokerColor = Poker.CONST.POKER_COLOR;
			for(var i in Poker.CONST.POKER_COLOR) {
				this[pokerColor[i]] = {}
				for(var j = 0; j < 13; j++) {
					this[pokerColor[i]][j] = this.getPokerByIndex(j, i);
				}
			}
			this["back"] = {}
			this["back"][0] = this.getPokerByIndex(3, 4);
		}
	}
}

Poker.Component.Layers = {}
function SuperLayer() {
	// this.layer =  layer;
}

SuperLayer.prototype = {
	init : function() {
		this.layer = new Kinetic.Layer();
		// add the layer to the stage
		Poker.Component.stage.add(this.layer);
	},
	clear : function() {
		this.layer.clear();
		this.layer.removeChildren();
	},
	drawByMessage : function(message, callback) {
		var pokers = Poker.tools.createPokersByMessage(message);
		this.drawByPokers(pokers, callback);
		return pokers;
	},
	drawByPokers : function(pokers, callback) {
	},
}

function FourLayer() {

}

FourLayer.prototype = new SuperLayer();
FourLayer.prototype.drawReceiveCards = function() {
	var msg = [["back", 0], ["back", 0], ["back", 0], ["back", 0], ["back", 0]];
	this.drawByMessage(msg);
};

FourLayer.prototype.drawShowCards = function(msg, switchTotal) {
	var backs = [["back", 0], ["back", 0], ["back", 0], ["back", 0], ["back", 0]];
	var pokers = this.drawByMessage(backs, function(e, i) {
		if(i >= 5 - switchTotal) {
			e.transitionTo({
				scale : {
					x : 0,
					y : 1
				},
				duration : 0.4
			});
		}
	});
	var father = this;
	setTimeout(function() {
		father.clear();
		father.drawByMessage(msg, function(e, i) {
			if(i >= 5 - switchTotal) {
				e.setScale({
					x : 0,
					y : 1
				});
				e.transitionTo({
					scale : {
						x : 1,
						y : 1
					},
					duration : 0.4
				});
			}
		});
	}, 500);
}

Poker.Component.Layers.dataLayer = (function() {
	var layer;
	function ThisLayer() {

	}


	ThisLayer.prototype = new SuperLayer();
	ThisLayer.prototype.init = function() {
		layer = new Kinetic.Layer();
		Poker.Component.pokerImage.onload = function() {
			pokerArray = Poker.Component.pokers;
			for(var i in pokerArray) {
				Poker.tools.addPokerArrayToLayer(pokerArray[i], layer);
			}
			// add the layer to the stage
			Poker.Component.stage.add(layer);
		}
	}
	return new ThisLayer();

})();

Poker.Component.Layers.bottomLayer = (function() {
	function ThisLayer() {

	}


	ThisLayer.prototype = new SuperLayer();
	ThisLayer.prototype.drawByPokers = function(pokers, callback) {
		Poker.tools.addPokerArrayToLayer(pokers, this.layer);
		var pokerTotal = pokers.length;
		if(pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);
			var currentPosition = Poker.Position.Bottom.centerX - totalLength / 2;
			for(var i in pokers) {
				var poker = pokers[i];
				poker.setPosition(currentPosition, Poker.Position.Bottom.centerY);
				if(callback != null) {
					callback(poker);
				}
				currentPosition += Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING;
			}
		}
	}

	ThisLayer.prototype.drawReceiveCards = function(message) {
		return this.drawByMessage(message, function(e) {
			e.on("mouseover", function() {
				this.setScale(1.1);
				Poker.Component.stage.draw();
			});
			e.on("mouseout", function() {
				this.setScale(1);
				Poker.Component.stage.draw();
			});
			e.on("click", function() {
				if(this.clicked != null) {
					this.setY(this.getY() + Poker.CONST.POKER_CLICK_UP_SPACING);
					Poker.Component.stage.draw();
					this.clicked = null;
				} else {
					this.clicked = "true";
					this.setY(this.getY() - Poker.CONST.POKER_CLICK_UP_SPACING);
					Poker.Component.stage.draw();
				}
			});
		});
	}
	// drawSwitchCards : this.drawReceiveCards
	ThisLayer.prototype.drawShowCards = function(showCards, stayCards) {
		this.drawByMessage(stayCards);
		this.drawByMessage(showCards, function(e) {
			e.setY(e.getY() - Poker.CONST.POKER_HEIGHT - Poker.CONST.POKER_SHOW_SPACING);
		});
	}
	return new ThisLayer();
})();

Poker.Component.Layers.leftLayer = (function() {
	function ThisLayer() {
	}


	ThisLayer.prototype = new FourLayer();
	ThisLayer.prototype.drawByPokers = function(pokers, callback) {
		Poker.tools.addPokerArrayToLayer(pokers, this.layer);
		var pokerTotal = pokers.length;
		if(pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);
			var currentPosition = Poker.Position.Left.centerY - totalLength / 2;
			for(var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(90);
				poker.setPosition(Poker.Position.Left.centerX, currentPosition);
				if(callback != null) {
					callback(poker, i);
				}
				currentPosition += Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING;
			}
		}
	};
	return new ThisLayer();
})();

Poker.Component.Layers.rightLayer = (function() {
	function ThisLayer() {
	}


	ThisLayer.prototype = new FourLayer();
	ThisLayer.prototype.drawByPokers = function(pokers, callback) {
		Poker.tools.addPokerArrayToLayer(pokers, this.layer);
		var pokerTotal = pokers.length;
		if(pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);
			var currentPosition = Poker.Position.Right.centerY + totalLength / 2;
			for(var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(90);
				poker.setPosition(Poker.Position.Right.centerX, currentPosition);
				if(callback != null) {
					callback(poker, i);
				}
				currentPosition -= Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING;
			}
		}
	};
	return new ThisLayer();
})();

Poker.Component.Layers.topLeftLayer = (function() {
	function ThisLayer() {
	}


	ThisLayer.prototype = new FourLayer();
	ThisLayer.prototype.drawByPokers = function(pokers, callback) {
		Poker.tools.addPokerArrayToLayer(pokers, this.layer);
		var pokerTotal = pokers.length;
		if(pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);
			var currentPosition = Poker.Position.TopLeft.centerX + totalLength / 2;
			for(var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(180);
				poker.setPosition(currentPosition, Poker.Position.TopLeft.centerY);
				if(callback != null) {
					callback(poker, i);
				}
				currentPosition -= Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING;
			}
		}
	};
	return new ThisLayer();
})();

Poker.Component.Layers.topRightLayer = (function() {
	function ThisLayer() {
	}


	ThisLayer.prototype = new FourLayer();
	ThisLayer.prototype.drawByPokers = function(pokers, callback) {
		Poker.tools.addPokerArrayToLayer(pokers, this.layer);
		var pokerTotal = pokers.length;
		if(pokerTotal > 0) {
			var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);
			var currentPosition = Poker.Position.TopRight.centerX + totalLength / 2;
			for(var i in pokers) {
				var poker = pokers[i];
				poker.rotateDeg(180);
				poker.setPosition(currentPosition, Poker.Position.TopRight.centerY);
				if(callback != null) {
					callback(poker, i);
				}
				currentPosition -= Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING;
			}
		}
	};
	return new ThisLayer();
})();

// TopRightLayer : new Kinetic.Layer(),
// }