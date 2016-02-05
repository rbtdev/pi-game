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
	debugger
	buttonPressCb(evt.data)
}

buttonPressCb = null;

module.exports = {
	onbuttonpress: function (cb) {
		buttonPressCb = cb;
	}
}