from time import sleep
from player import Player
from players import Players



players = Players()
players.add(Player("Player 1",17,13))
players.add(Player("Player 2",22,26))


def buttonPressed(paddle):
		palyers.disable()
		players.setCurrent(paddle.owner)
		palyers.buttonPushedEvent.set()
		
while True:
	players.setCurrent(None)
	players.buttonPushedEvent.clear()
	print("Push the button!")
	players.enable()
	players.buttonPushedEvent.wait(10)
	if players.current != None:
		print(players.current.name)
		players.current.on()
		sleep(3)
		players.current.off()
	else:
		print("Nobody buzzed.!")
		print("New Question.")
		sleep(1)
