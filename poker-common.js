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

