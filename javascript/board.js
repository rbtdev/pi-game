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
	PlayerDisplay = window.open("./player-board.html", "Player Window");
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