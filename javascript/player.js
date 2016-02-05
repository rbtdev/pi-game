var Paddle = require('./paddles.js').Paddle;

function Player (name, divId, color) {
	this.name = name;
	this.paddle = new Paddle(divId, color);

	console.log("Player - " + name + " created. Paddle id = " + this.paddle.id)
}

module.exports = Player;
