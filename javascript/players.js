var Paddles = require("./paddles.js")
var players = [];

function create (playerList, element, buttonPressedCb) {
	for (var i = 0; i < playerList.length; i++) {
		var playerElement = document.createElement("div");
		playerElement.className = "player";
		playerElement.style.border = "1px solid " + playerList[i].color;
		playerElement.innerHTML = playerList[i].name;
		element.appendChild(playerElement);
		players.push(Player(playerList[i].name, playerElement, playerList[i].color ))
		Paddles.onPress(buttonPressedCb);
	}
}

function Player (name, element, color) {
	this.name = name;
	this.paddle = new Paddles.Paddle(element, color);
	console.log("Player - " + name + " created. Paddle id = " + this.paddle.id)
}

reset = function reset () {
	Paddles.reset()
}

module.exports = {
	reset: reset,
	create: create
}