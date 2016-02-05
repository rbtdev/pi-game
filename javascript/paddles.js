var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
function buttonPress (paddleId) {
	console.log("Button pressed on paddle - " + paddleId);

}

module.exports = {

	Paddle: function () {
		this.id = paddleCount++
		PaddleIo.register(this.id, buttonPress)
	}

}