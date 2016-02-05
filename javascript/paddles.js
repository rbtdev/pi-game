var PaddleIo = require('./paddleIo.js');

var paddleCount = 0;
function buttonPress (paddleId) {
	console.log("Button pressed on paddle - " + paddleId);

}

PaddleIo.onbuttonpress(buttonPress);

module.exports = {

	Paddle: function () {
		this.id = paddleCount++
		paddleIo.register(id, buttonPress)
	}

}