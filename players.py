import threading

class Players:
	def __init__(self):
		self.list = []
		self.current = None
		self.buttonPushedEvent = threading.Event()
		self.pins = [
			{
				buttonPin: 17 ,
				ledPin: 13 ,
			},
			{
				buttonPin: 22 ,
				ledPin: 26 ,
			}
		]

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
	
	def add(self, name, buttonPin, ledPin):

		self.list.append(Player(name, buttonPin, ledPin, self.buttonPressed))

	def buttonPressed(self, paddle):
		self.disable()
		self.setCurrent(paddle.owner)
		self.buttonPushedEvent.set()

