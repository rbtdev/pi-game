var wsUrl = "ws://192.168.1.148:5000/button";
var ws = new WebSocket(wsUrl);

ws.onopen = function () {
	console.log("websocket opened.");
}

ws.onclose = function () {
	console.log("websocket closed.");
}

ws.onmessage = function (evt) {
	console.log("websocket message: " + evt.data)
	var message = JSON.parse(evt.data);
	if (message.event == 'buttonpress') {
		callbacks[message.paddleId].buttonpress(message.paddleId);
	}
}

callbacks = []

module.exports = {
	register: function (id, event, cb) {
		var chain = callbacks[id] || {};
		chain[event] = cb;
		callbacks[id] = chain;
	}
}