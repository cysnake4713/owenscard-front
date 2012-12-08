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
