var ws = null;

function connect(cb) {
	var wsUrl = "ws://192.168.1.148:5000/button";

	ws = new WebSocket(wsUrl);

	ws.onopen = function () {
		console.log("websocket opened.");
		disable();
		cb();
	}

	ws.onclose = function () {
		console.log("websocket closed.");
	}

	ws.onmessage = function (evt) {
		console.log("websocket message: " + evt.data)
		var message = JSON.parse(evt.data);
		if (message.event == 'buttonpress') {
			callbacks[message.paddleId].buttonpress(parseInt(message.paddleId));
		}
	}
}

callbacks = []

module.exports = {
	register: function (id, event, cb) {
		var chain = callbacks[id] || {};
		chain[event] = cb;
		callbacks[id] = chain;
	},
	reset: function () {
		var resetMessage = {
			'event': 'reset'
		}
		ws.send(JSON.stringify(resetMessage));
	},

	disable: function () {
		var disableMessage = {
			'event': 'disable'
		}
		ws.send(JSON.stringify(disableMessage));
	},
	connect: connect
}