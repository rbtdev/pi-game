var Board = require("./board.js");
var Players = require("./players.js");
var PaddleIo = require("./paddleIo.js");

var ringTimer;
var playTimer;
var currentPlayer;
var currentQuestion;
var sounds = {
	right: new Audio('./sounds/right.mp3'),
	wrong: new Audio('./sounds/wrong.mp3'),
	timeout: new Audio('./sounds/timeout.mp3'),
	newGame: new Audio('./sounds/new-game.mp3'),
	ringer: new Audio('./sounds/ringer.mp3')
}

window.onload = init;

function reset () {
	Players.reset()
}

function start () {
	Players.reset();
	Board.message("Players have 10 seconds to ring in");
	ringTimer = setTimeout(function () {
		Board.message("Nobody rang in - disabling paddles")
		Players.disable();
		sounds.timeout.play();
	}, 10000)
}

function wrong () {
	clearTimeout(playTimer);
	Players.reset()
	Players.list[currentPlayer].updateScore(-currentQuestion.points);
	Board.message("Player was WRONG - other players may now ring in")
	sounds.wrong.play();
	start()
}

function right () {
	clearTimeout(playTimer);
	Board.message("Player was RIGHT - he picks next question");
	Players.reset();
	Players.disable();
	Players.list[currentPlayer].updateScore(currentQuestion.points);
	sounds.right.play();
}

function playerPressed(playerId) {
	clearTimeout(ringTimer);
	sounds.ringer.play();
	currentPlayer = playerId
	Board.message("Player " + playerId + ": You have 10 seconds to answer");
	playTimer = setTimeout(function () {
		sounds.timeout.play();
		Board.message("Player " + playerId + ": Time is up - Other players ring in.");
		Players.list[currentPlayer].updateScore(-currentQuestion.points);
		Players.reset();
		start();
	}, 10000)
}

function boardEventCb(evt) {
	if (evt.message == "question-displayed") {
		Players.disable();
		Board.message("Wait for moderator to finish - green light.");
		Board.question(evt.data.question);
		Board.answer(evt.data.answer);
		currentQuestion = evt.data;
	} else if (evt.message == "start-timer") {
		start();
	}
}

function init () {
	PaddleIo.connect(function () {
		Board.create("board", boardEventCb); 
		Players.create(
			[
				{ name: "Rob", color: "blue" },
				{ name: "Alyssa", color: "red" }
			],
				document.getElementById("players"),
				playerPressed
			);
		Players.disable();
		Players.list[0].updateScore(100);
		document.getElementById("right").onclick = right;
		document.getElementById("wrong").onclick = wrong;
		sounds.newGame.play();
	})
}