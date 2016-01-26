import threading

class Players:
	def __init__(self):
		self.list = []
		self.current = None
		self.buttonPushedEvent = threading.Event()

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
	
	def add(self, player):
		self.list.append(player)

	def buttonPressed(self, paddle):
		self.disable()
		self.setCurrent(paddle.owner)
		self.buttonPushedEvent.set()
