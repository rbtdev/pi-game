import threading
from paddle import Paddle
from player import Player

class Players:
	def __init__(self):
		self.list = []
		self.current = None
		self.buttonPushedEvent = threading.Event()
		self.buttonPressedCb = None

	def setCurrent(player):
		self.current = player
	
	def enable(self):
		for player in self.list:
			player.enable()

	def disable(self):
		for player in self.list:
			player.disable()	

	def setCurrent(self, player):
		self.current = player
	
	def add(self, name):
		paddle = Paddle(len(self.list), self.buttonPressed)	
		self.list.append(Player(name, paddle))

	def setButtonPressedCb(self,cb):
		self.buttonPressedCb = cb

	def buttonPressed(self, paddle):
		self.disable()
		self.setCurrent(paddle.owner)
		self.buttonPushedEvent.set()
		if (self.buttonPressedCb):
			self.buttonPressedCb()

