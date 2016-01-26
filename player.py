from paddle import Paddle

class Player:
	def __init__(self, name, paddle):
		self.name = name
		self.score = 0
		self.paddle = paddle
		paddle.owner = self

	def enable(self):
		self.paddle.enable()

	def disable(self):
		self.paddle.disable()

	def on(self):
		self.paddle.led.on()

	def off(self):
		self.paddle.led.off()

	def pressed(self):
		return self.paddle.button.is_pressed
