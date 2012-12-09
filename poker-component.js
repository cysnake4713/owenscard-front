Poker.Component = {

	init : function() {
		Poker.Component.pokerImage = new Image();
		Poker.Component.stage = new Kinetic.Stage({
			container : 'container',
			width : Poker.Global.WINDOW_WIDTH,
			height : Poker.Global.WINDOW_HEIGHT
		});
		Poker.Component.pokers.init();
		Poker.Component.Layers.dataLayer.init();
		Poker.Component.Layers.bottomLayer.init();
		Poker.Component.Layers.leftLayer.init();
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
Poker.Component.Layers.dataLayer = (function() {
	var layer;

	return {
		init : function() {
			layer = new Kinetic.Layer();
			Poker.Component.pokerImage.onload = function() {
				pokerArray = Poker.Component.pokers;
				for(var i in pokerArray) {
					Poker.tools.addPokerArrayToLayer(pokerArray[i], layer);
				}
				// add the layer to the stage
				Poker.Component.stage.add(layer);
			}
		},
		clear : function() {
			layer.clear();
			layer.removeChildren();
		}
	}

})();

Poker.Component.Layers.bottomLayer = (function() {
	var layer;

	return {
		init : function() {
			layer = new Kinetic.Layer();
			// add the layer to the stage
			Poker.Component.stage.add(layer);
		},
		clear : function() {
			layer.clear();
			layer.removeChildren();
		},
		drawByMessage : function(message, callback) {
			var pokers = Poker.tools.createPokersByMessage(message);
			this.drawByPokers(pokers, callback);
			return pokers;
		},
		drawByPokers : function(pokers, callback) {
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
			Poker.tools.addPokerArrayToLayer(pokers, layer);
		},
		drawReceiveCards : function(message) {
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
		},
		// drawSwitchCards : this.drawReceiveCards
		drawShowCards : function(showCards, stayCards) {
			this.drawByMessage(stayCards);
			this.drawByMessage(showCards, function(e) {
				e.setY(e.getY() - Poker.CONST.POKER_HEIGHT - Poker.CONST.POKER_SHOW_SPACING);
			});
		}
	}
})();

Poker.Component.Layers.leftLayer = (function() {
	var layer;

	return {
		init : function() {
			layer = new Kinetic.Layer();
			// add the layer to the stage
			Poker.Component.stage.add(layer);
		},
		clear : function() {
			layer.clear();
			layer.removeChildren();
		},
		drawByMessage : function(message, callback) {
			var pokers = Poker.tools.createPokersByMessage(message);
			this.drawByPokers(pokers, callback);
			return pokers;
		},
		drawByPokers : function(pokers, callback) {
			Poker.tools.addPokerArrayToLayer(pokers, layer);
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
		},
		drawReceiveCards : function() {
			var msg = [["back", 0], ["back", 0], ["back", 0], ["back", 0], ["back", 0]];
			this.drawByMessage(msg);
		},
		drawShowCards : function(msg, switchTotal) {
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
	}
})();
// RightLayer : new Kinetic.Layer(),
// TopLeftLayer : new Kinetic.Layer(),
// TopRightLayer : new Kinetic.Layer(),
// }