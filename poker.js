Poker.Builder = {	var Poker = {}	Poker.Component = {	Poker.tools = {
	init : function() {	Poker.CONST = {		
		BOTTOM : 'bottom',		init : function() {		/*
	},		LEFT : 'left',			Poker.Component.pokerImage = new Image();		 将poker Image加入到指定Layer中
		RIGHT : 'right',			Poker.Component.stage = new Kinetic.Stage({		 */
	/*		TOPLEFT : 'topLeft',				container : 'container',		addPokerArrayToLayer : function(pokers, layer) {
	 将图片中的所有扑克初始化放到pokerArray中		TOPRIGHT : 'topRight',				width : Poker.Global.WINDOW_WIDTH,			for (var i in pokers) {
	 */		POKER_WIDTH : 70,				height : Poker.Global.WINDOW_HEIGHT				layer.add(pokers[i]);
	initComopentPokerArray : function() {		POKER_HEIGHT : 95,			});			}
		pokerColor = Poker.CONST.POKER_COLOR;		POKER_SPACING : 10,			Poker.Component.pokers.init();		},
		for (var i in Poker.CONST.POKER_COLOR) {				Poker.Component.Layers.dataLayer.init();	
			Poker.Component.Pokers[pokerColor[i]] = {}		POKER_COLOR : {			Poker.Component.Layers.bottomLayer.init();		/*
			for (var j = 0; j < 13; j++) {			DIAMOND : "diamond",			Poker.Component.pokerImage.src = 'poker.png';		 由数组message创建poker对象
				Poker.Component.Pokers[pokerColor[i]][j] = getPokerByIndex(j, i);			CLUB : "club",		},		 */
			}			HEARTS : "hearts",			createPokersByMessage : function(message) {
		}			SPADE : "spade"		pokers : {			var result = new Array();
		pokerArray["back"] = new Array();		}			/*			for (var i in message) {
		pokerArray["back"][0] = getPokerByIndex(3, 4);	}			 方片: x = 0				var poker = Poker.Component.pokers[message[i][0]][message[i][1]].clone();
	}	Poker.Global = {			 草花: x = 1				result.push(poker);
}		WINDOW_HEIGHT : $(window).height() - 65,			 红桃: x = 2			}
		WINDOW_WIDTH : $(window).width()			 黑桃: x = 3			return result;
	}			 王:   x = 4 (y = 0~1)		}
				 背面: x = 4 (y = 2~5)	}
	Poker.Position = {			 */	
			
		Bottom : {			getPokerByIndex : function(x, y) {	
			centerX : Poker.Global.WINDOW_WIDTH / 2,				var poker = new Kinetic.Image({	
			centerY : Poker.Global.WINDOW_HEIGHT - 60					image : Poker.Component.pokerImage,	
		},					width : 70,	
		Left : {					height : 95,	
			centerX : 60,					crop : {	
			centerY : Poker.Global.WINDOW_HEIGHT / 2						x : 70 * x,	
		},						y : 95 * y,	
		Right : {						width : 70,	
			centerX : Poker.Global.WINDOW_WIDTH - 80,						height : 95	
			centerY : Poker.Global.WINDOW_HEIGHT / 2					}	
		},					//		,draggable: true	
		TopLeft : {				});	
			centerX : Poker.Global.WINDOW_WIDTH / 4 + 50,				poker.setPosition(-100, -100);	
			centerY : 60				poker.setOffset(70 / 2, 95 / 2);	
		},				return poker;	
		TopRight : {			},	
			centerX : (Poker.Global.WINDOW_WIDTH / 4) * 3 - 70,		
			centerY : 60			init : function() {	
		}				pokerColor = Poker.CONST.POKER_COLOR;	
	}				for (var i in Poker.CONST.POKER_COLOR) {	
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
				drawByMessage : function(message, callback) {	
					var pokers = Poker.tools.createPokersByMessage(message);	
					this.drawByPokers(pokers, callback);	
				},	
			
				drawByPokers : function(pokers, callback) {	
					var pokerTotal = pokers.length;	
					if (pokerTotal > 0) {	
						var totalLength = (pokerTotal - 1) * Poker.CONST.POKER_WIDTH + Poker.CONST.POKER_SPACING * (pokerTotal - 1);	
						var currentPosition = Poker.Position.Bottom.centerX - totalLength / 2;	
						for (var i in pokers) {	
							var poker = pokers[i];	
							poker.setPosition(currentPosition, Poker.Position.Bottom.centerY);	
							if (callback != null) {	
								callback(poker);	
							}	
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
