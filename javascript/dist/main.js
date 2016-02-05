(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Player = require("./player.js")

var player1 = new Player("Rob");
var player2 = new Player("Alyssa")

player1.onpress = function (player) {
	console.log('Player: ' + player.name + " pressed.");
}

player2.onpress = function (player) {
	console.log('Player: ' + player.name + " pressed.");
}


},{"./player.js":4}],2:[function(require,module,exports){
var wsUrl = "ws://192.168.1.148:5000/paddle";
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
},{}],3:[function(require,module,exports){
var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
function buttonPress (paddleId) {
	console.log("Button pressed on paddle - " + paddleId);
	paddleDiv = document.getElementById('paddle' + paddleId+1);
	paddleDiv.style.backgroundColor = "red"
}

module.exports = {

	Paddle: function () {
		this.id = paddleCount++
		PaddleIo.register(this.id, 'buttonpress', buttonPress)
	}

}
},{"./paddleIo.js":2}],4:[function(require,module,exports){
var Paddle = require('./paddles.js').Paddle;

function Player (name) {
	this.name = name;
	this.paddle = new Paddle();
	this.paddle.onpress = function () {

	}
	this.onpress = null
	console.log("Player - " + name + " created. Paddle id = " + this.paddle.id)
}

module.exports = Player;

},{"./paddles.js":3}]},{},[1,2,3,4]);
