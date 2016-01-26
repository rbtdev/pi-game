from time import sleep
import threading
from paddle import Paddle
from player import Player

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
