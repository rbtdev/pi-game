import threading
from paddle import Paddle

class Paddles:
	def __init__(self):
		self.list = []
		self.current = None
		self.buttonPushedEvent = threading.Event()
		self.buttonPressedCb = None
		self.add();
		self.add()

	def setCurrent(paddle):
		self.current = paddle
	
	def enable(self):
		for paddle in self.list:
			paddle.enable()

	def disable(self):
		for paddle in self.list:
			paddle.disable()	

	def setCurrent(self, paddle):
		self.current = paddle
	
	def add(self):
		paddle = Paddle(len(self.list), self.buttonPressed)	
		self.list.append(paddle)

	def setButtonPressedCb(self,cb):
		self.buttonPressedCb = cb

	def buttonPressed(self, paddle):
		self.disable()
		self.setCurrent(paddle)
		paddle.on();
		self.buttonPushedEvent.set()
		if (self.buttonPressedCb):
			self.buttonPressedCb()
