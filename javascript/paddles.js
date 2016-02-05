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