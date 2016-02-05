(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Player = require("./player.js")
var Paddles = require("./paddles.js")

reset = function reset () {
	Paddles.reset()
}

init = function init () {
	console.log("Loaded")
	var player1 = new Player("Rob", "div1", "blue");
	var player2 = new Player("Alyssa", "div2", "red")
}
},{"./paddles.js":3,"./player.js":4}],2:[function(require,module,exports){
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
		callbacks[message.paddleId].buttonpress(parseInt(message.paddleId));
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
	}
}
},{}],3:[function(require,module,exports){
var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
var paddles = [];

function buttonPress (paddleId) {
	console.log("Button pressed on paddle - " + paddleId);
	paddles[paddleId].element.style.backgroundColor = paddles[paddleId].color;
}

function reset (paddleId) {
	PaddleIo.reset();
	for (var i = 0; i<paddles.length; i++) {
		PaddleIo.reset(i);
		paddles[i].element.style.backgroundColor = "white";
	}
}

function Paddle (divId, color) {
	this.id = paddleCount++
	this.element = document.getElementById(divId);
	this.color = color;
	this.element.style.borderColor = color;
	PaddleIo.register(this.id, 'buttonpress', buttonPress)
	paddles.push(this)
}

module.exports = {
	Paddle: Paddle,
	reset: reset
}
},{"./paddleIo.js":2}],4:[function(require,module,exports){
var Paddle = require('./paddles.js').Paddle;

function Player (name, divId, color) {
	this.name = name;
	this.paddle = new Paddle(divId, color);

	console.log("Player - " + name + " created. Paddle id = " + this.paddle.id)
}

module.exports = Player;

},{"./paddles.js":3}]},{},[1,2,3,4]);
