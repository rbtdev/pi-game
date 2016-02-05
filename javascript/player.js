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
