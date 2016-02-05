var Player = require("./player.js")
var Paddles = require("./paddles.js")

var player1 = new Player("Rob");
var player2 = new Player("Alyssa")

player1.onpress = function (player) {
	console.log('Player: ' + player.name + " pressed.");
}

player2.onpress = function (player) {
	console.log('Player: ' + player.name + " pressed.");
}

reset = function () {
	Paddles.reset()
}
