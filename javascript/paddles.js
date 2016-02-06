var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
var paddles = [];
var onpress = null;

function handleButtonPress (paddleId) {
	var paddle = paddles[paddleId];
	console.log("Button pressed on paddle - " + paddleId);
	paddle.element.style.backgroundColor = paddles[paddleId].color;
	paddle.element.style.color = "white";
	if (onpress) {
		onpress(paddleId);
	}

}

function reset (paddleId) {
	PaddleIo.reset();
	for (var i = 0; i<paddles.length; i++) {
		PaddleIo.reset(i);
		paddles[i].element.style.backgroundColor = "white";
		paddles[i].element.style.color = paddles[i].color;
	}
}

function onPress(onPressCb) {
	onpress = onPressCb
}

function Paddle (element, color) {
	this.id = paddleCount++
	this.element =  element;
	this.color = color;
	this.element.style.borderColor = color;
	this.element.style.color = color;
	PaddleIo.register(this.id, 'buttonpress', handleButtonPress);
	paddles.push(this)
}

module.exports = {
	Paddle: Paddle,
	reset: reset,
	onPress: onPress
}