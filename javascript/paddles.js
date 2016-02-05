var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
function buttonPress (paddleId) {
	console.log("Button pressed on paddle - " + paddleId);
	var divId = "paddle" + (paddleId + 1);
	var paddleDiv = document.getElementById(divId);
	paddleDiv.style.backgroundColor = "red"
}

module.exports = {

	Paddle: function () {
		this.id = paddleCount++
		PaddleIo.register(this.id, 'buttonpress', buttonPress)
	},

	reset: function () {
		PaddleIo.reset();
	}

}