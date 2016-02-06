var Board = require("./board.js");
var Players = require("./players.js");

var ringTimer;
var playTimer;
var currentPlayer;

reset = function reset () {
	Players.reset()
}

start = function start () {
	Players.reset();
	Board.message("Players have 10 seconds to ring in");
	ringTimer = setTimeout(function () {
		Board.message("Nobody rang in - disabling paddles")
		Players.disable();
	}, 10000)
}

wrong = function wrong () {
	clearTimeout(playerTimer);
	Players.reset()
	Board.message("Player was WRONG - other players may now ring in")
	start()
}

rignt = function right () {

}
function playerPressed(playerId) {
	clearTimeout(ringTimer);
	currentPlayer = playerId
	Board.message("Player " + playerId + ": You have 10 seconds to answer");
	playTimer = setTimeout(function () {
		Board.message("Player " + playerId + ": Time is up - Other players ring in.");
		Players.reset();
		start();
	}, 10000)
}

function boardEventCb(evt) {
	if (evt.message == "question-displayed") {
		Board.message("Wait for moderator to finish - green light.");
		Board.question(evt.data.question);
		Board.answer(evt.data.answer);
	} else if (evt.message == "start-timer") {
		start();
	}
}

init = function init () {
	Board.create("board", boardEventCb); 
	Players.create(
		[
			{ name: "Rob", color: "blue" },
			{ name: "Alyssa", color: "red" }
		],
			document.getElementById("players"),
			playerPressed
		);
}