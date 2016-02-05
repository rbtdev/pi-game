var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
function buttonPress (paddleId) {
	console.log("Button pressed on paddle - " + paddleId);
	paddleDiv = document.getElementById('paddle' + paddleId+1);
	paddleDiv.style.backgroundColor = "red"
}

module.exports = {

	Paddle: function () {
		this.id = paddleCount++
		PaddleIo.register(this.id, 'buttonpress', buttonPress)
	}

}