var wsUrl = "ws://192.168.1.148:5000/button";
var ws = new WebSocket(wsUrl);

ws.onopen = function () {
	console.log("websocket opened.");
}

ws.onclose = function () {
	console.log("websocket closed.");
}

ws.onmessage = function (evt) {
	console.log("websocket message: " + parseInt(evt.data))
	callbacks[data]()
}

callbacks = [];

module.exports = {
	register: function (id, cb) {
		callbacks[id] = cb
	}
}