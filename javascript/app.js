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