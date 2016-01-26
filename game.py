from gpiozero import Button, LED
from time import sleep
from datetime import datetime
import threading
class Paddle:
	def __init__(self, owner, buttonPin, ledPin):
		self.owner = owner
		self.button = Button(buttonPin)
		self.led = LED(ledPin)
		self.led.off()
		self.pressedAt = None

	def enable(self):
		self.button.when_pressed = self.handleButtonPress
	
	def disable(self):
		self.button.when_pressed = None
	
	def handleButtonPress(self):
		self.pressedAt = datetime.now()
		print(self.pressedAt)
		buttonPressed(self)

	
class Player:
	def __init__(self, name, buttonPin, ledPin):
		self.name = name
		self.score = 0
		self.paddle = Paddle(self, buttonPin, ledPin)
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

class Players:
	def __init__(self):
		self.list = []
		self.current = None
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
	
global activePlayer 

buttonPushedEvent = threading.Event()

def buttonPressed(paddle):
	global players
	players.disable()
	players.setCurrent(paddle.owner)
	buttonPushedEvent.set()


players = Players()
players.add(Player("Player 1",17,13))
players.add(Player("Player 2",22,26))


while True:
	players.setCurrent(None)
	buttonPushedEvent.clear()
	print("Push the button!")
	players.enable()
	buttonPushedEvent.wait(10)
	if players.current != None:
		print(players.current.name)
		players.current.on()
		sleep(3)
		players.current.off()
	else:
		print("Nobody buzzed.!")
		print("New Question.")
		sleep(1)
