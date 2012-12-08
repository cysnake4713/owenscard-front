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
		centerX : Poker.CONST.WINDOW_WIDTH / 2,
		centerY : Poker.CONST.WINDOW_HEIGHT - 60
	},
	Left : {
		centerX : 60,
		centerY : Poker.CONST.WINDOW_HEIGHT / 2
	},
	Right : {
		centerX : Poker.CONST.WINDOW_WIDTH - 80,
		centerY : Poker.CONST.WINDOW_HEIGHT / 2
	},
	TopLeft : {
		centerX : Poker.CONST.WINDOW_WIDTH / 4 + 50,
		centerY : 60
	},
	TopRight : {
		centerX : (Poker.CONST.WINDOW_WIDTH / 4) * 3 - 70,
		centerY : 60
	}
}

Poker.Component = {
	pokerImage : new Image(),
	init : function() {
		this.pokerImage.src = 'poker.png';
	}
}

Poker.Component = {
	Stage : "",
	Pokers : {
		init : function() {
			pokerColor = Poker.CONST.POKER_COLOR;
			for (var i in Poker.CONST.POKER_COLOR) {
				this[pokerColor[i]] = {}
				for (var j = 0; j < 13; j++) {
					this[pokerColor[i]][j] = this.getPokerByIndex(j, i);
				}
			}
			pokerArray["back"] = {}
			pokerArray["back"][0] = this.getPokerByIndex(3, 4);
		},
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
		}
	},
	Layers : {
		DataLayer : new Kinetic.Layer(),
		BottomLayer : new Kinetic.Layer(),
		LeftLayer : new Kinetic.Layer(),
		RightLayer : new Kinetic.Layer(),
		TopLeftLayer : new Kinetic.Layer(),
		TopRightLayer : new Kinetic.Layer()
	}
}

