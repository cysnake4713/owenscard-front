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

