var Paddles = require("./paddles.js")
var players = [];

function create (playerList, element, buttonPressedCb) {
	for (var i = 0; i < playerList.length; i++) {
		var playerElement = document.createElement("div");
		playerElement.className = "player";
		element.appendChild(playerElement);

		var paddleElement = document.createElement("div");
		paddleElement.className = "paddle";
		paddleElement.style.border = "1px solid " + playerList[i].color;
		paddleElement.innerHTML = playerList[i].name;
		playerElement.appendChild(paddleElement);

		var scoreElement = document.createElement("div");
		scoreElement.className = "score";
		scoreElement.innerHTML = 0;
		playerElement.appendChild(scoreElement);

		players.push(new Player(playerList[i].name, paddleElement, scoreElement, playerList[i].color ))
		Paddles.onPress(buttonPressedCb);
	}
}

function updateScore  (delta) {
	this.score += delta;
	this.scoreElement.innerHTML = this.score;

}
function Player (name, paddleElement, scoreElement, color) {
	var updateScore = function updateScore(delta) {
		this.score +=delta;
		this.scoreElement.innerHTML = this.score;
	}

	this.name = name;
	this.scoreElement = scoreElement;
	this.score = 0;
	this.updateScore = updateScore;
	this.paddle = new Paddles.Paddle(paddleElement, color);
	console.log("Player - " + name + " created. Paddle id = " + this.paddle.id)
}

reset = function reset () {
	Paddles.reset()
}

disable = function disable() {
	Paddles.disable()
}

module.exports = {
	reset: reset,
	create: create,
	disable: disable,
	list:players
}