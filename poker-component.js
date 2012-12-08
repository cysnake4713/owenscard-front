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
			for (var i in Poker.CONST.POKER_COLOR) {
				this[pokerColor[i]] = {}
				for (var j = 0; j < 13; j++) {
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
				for (var i in pokerArray) {
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
		drawByMessage : function(message) {
			var pokers = Poker.tools.createPokersByMessage(message);
			this.drawByPokers(pokers);
		},

		drawByPokers : function(pokers) {
			var pokerTotal = pokers.length;
			if (pokerTotal > 0) {
				var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);
				var currentPosition = Poker.Position.Bottom.centerX - totalLength / 2;
				for (var i in pokers) {
					var poker = pokers[i];
					poker.setPosition(currentPosition, Poker.Position.Bottom.centerY);
					currentPosition += Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING;
				}
			}
			Poker.tools.addPokerArrayToLayer(pokers, layer);
		}
	}
})();
// LeftLayer : new Kinetic.Layer(),
// RightLayer : new Kinetic.Layer(),
// TopLeftLayer : new Kinetic.Layer(),
// TopRightLayer : new Kinetic.Layer(),
// }
