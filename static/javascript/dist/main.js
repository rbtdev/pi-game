(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./board.js":2,"./paddleIo.js":3,"./players.js":5}],2:[function(require,module,exports){
var Questions = require("./questions.js");

var Playerdisplay = null;


function addCategoryColumn (display, element, cat) {
		var catDiv = display.document.createElement('div');
		catDiv.id = "cat-" + cat;
		catDiv.className = "category";
		element.appendChild(catDiv);
		var catHeader = addCategoryHeader(display, catDiv, cat);
		return catDiv
}

function addCategoryHeader(display, categoryColumn, cat) {
		var categoryText = Questions[cat].category
		var catHeader = display.document.createElement('div');
		catHeader.className = "board-box category-header";
		var catHeaderText = display.document.createElement("div");
		catHeaderText.className = "board-text";
		catHeaderText.innerHTML =  "<p>" + categoryText + "</p>";
		catHeader.appendChild(catHeaderText);
		categoryColumn.appendChild(catHeader);
		return catHeader;
}

function addQuestions(display, categoryColumn, questions) {
	for (var q = 0; q < questions.length; q++) {
		var questionDiv = display.document.createElement('div');

		questionDiv.className = "board-box question-points";
		var questionText = display.document.createElement('div');
		questionText.id = categoryColumn.id + "-" + q;
		questionText.className = "board-text question-points";
		questionText.innerHTML = "<p>" + questions[q].points +"</p>";
		questionDiv.appendChild(questionText);
		questionText.onclick = showQuestion(display, questionText.id);
		categoryColumn.appendChild(questionDiv);
	}
}

function showQuestion (display, id) {
	return function () {
		var div = display.document.getElementById(id);
		var playerDiv = PlayerDisplay.document.getElementById(id);
		var cat = id.split('-')[1];
		var question = id.split('-')[2];
		var text = Questions[cat].questions[question].question;
		if (text.length > 45) {
			div.style.fontSize = "20px";
		}
		div.innerHTML = "<p>" + text + "</p>";
		div.className = "board-text question-question";
		div.onclick = startTimer(display, id)
		playerDiv.innerHTML = "<p>" + text + "</p>";
		playerDiv.className = "board-text question-question";
		EventCb({message:"question-displayed", data: Questions[cat].questions[question]})
	}
}

function startTimer (display, id) {
	return function () {
		EventCb({message:"start-timer"});
		var div = display.document.getElementById(id);
		div.onclick = showAnswer(display, id);
	}
}
function showAnswer (display, id) {
	return function () {
		var div = display.document.getElementById(id);
		var cat = id.split('-')[1];
		var question = id.split('-')[2];
		div.innerHTML = "<p>" + Questions[cat].questions[question].answer + "</p>";
		div.className = "board-text question-answer";
	}
}
function create (element, eventCb) {
	EventCb = eventCb;
	PlayerDisplay = window.open("/player-board.html", "Player Window");
	PlayerDisplay.addEventListener('load', 
		function (display, element) {
			return function () {
				console.log("Loaded")
				setupDisplay(display, display.document.getElementById(element));
			}
		}(PlayerDisplay, element), false);
	ModDisplay = window;
	setupDisplay(ModDisplay, ModDisplay.document.getElementById(element));
}

function setupDisplay(display, element) {

	for (var cat = 0; cat < Questions.length; cat++) {
		var catColumn = addCategoryColumn(display, element, cat)
		addQuestions(display, catColumn, Questions[cat].questions);
	}
}

function message(message) {
	ModDisplay.document.getElementById('message').innerHTML = message;
	PlayerDisplay.document.getElementById('message').innerHTML = message;
}

function question(message) {
	var messageDiv = ModDisplay.document.getElementById('question');
	messageDiv.innerHTML = message;
}

function answer(message) {
	var messageDiv = ModDisplay.document.getElementById('answer');
	messageDiv.innerHTML = message;
}

module.exports = {
	create: create,
	message: message,
	question: question,
	answer: answer
}
},{"./questions.js":6}],3:[function(require,module,exports){
var ws = null;

function connect(cb) {
	var wsUrl = "ws://192.168.1.148:5000/button";

	ws = new WebSocket(wsUrl);

	ws.onopen = function () {
		console.log("websocket opened.");
		disable();
		cb();
	}

	ws.onclose = function () {
		console.log("websocket closed.");
	}

	ws.onmessage = function (evt) {
		console.log("websocket message: " + evt.data)
		var message = JSON.parse(evt.data);
		if (message.event == 'buttonpress') {
			callbacks[message.paddleId].buttonpress(parseInt(message.paddleId));
		}
	}
}

callbacks = []

module.exports = {
	register: function (id, event, cb) {
		var chain = callbacks[id] || {};
		chain[event] = cb;
		callbacks[id] = chain;
	},
	reset: function () {
		var resetMessage = {
			'event': 'reset'
		}
		ws.send(JSON.stringify(resetMessage));
	},

	disable: function () {
		var disableMessage = {
			'event': 'disable'
		}
		ws.send(JSON.stringify(disableMessage));
	},
	connect: connect
}
},{}],4:[function(require,module,exports){
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

function disable() {
	PaddleIo.disable();
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
	onPress: onPress,
	disable: disable
}
},{"./paddleIo.js":3}],5:[function(require,module,exports){
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
},{"./paddles.js":4}],6:[function(require,module,exports){

var board = [
	{ 
		category: "Cat 1", 
		questions: [
			{
				question: "This is question that is really long so we'll see if it wraps salkdj sa sad sd ad as asd asdd sad d sad sdasa sakj dlk ad ds kjsaas",
				answer: "This is an answer that is really long so we'll know what happnes",
				points: 100
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 200
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 300
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 400
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 500
			}
		]
	},

	{ 
		category: "Cat 2", 
		questions: [
			{
				question: "This is question",
				answer: "This is an answer",
				points: 100
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 200
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 300
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 400
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 500
			}
		]
	},
	{ 
		category: "Cat 3", 
		questions: [
			{
				question: "This is question",
				answer: "This is an answer",
				points: 100
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 200
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 300
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 400
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 500
			}
		]
	},
	{ 
		category: "Cat 4", 
		questions: [
			{
				question: "This is question",
				answer: "This is an answer",
				points: 100
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 200
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 300
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 400
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 500
			}
		]
	},
	{ 
		category: "Cat 5", 
		questions: [
			{
				question: "This is question",
				answer: "This is an answer",
				points: 100
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 200
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 300
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 400
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 500
			}
		]
	},
	{ 
		category: "Cat 6", 
		questions: [
			{
				question: "This is question",
				answer: "This is an answer",
				points: 100
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 200
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 300
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 400
			},
			{
				question: "This is question",
				answer: "This is an answer",
				points: 500
			}
		]
	}
]

module.exports = board;
},{}]},{},[1,2,3,4,5,6]);
