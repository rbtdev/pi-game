from time import sleep
from players import Players
import Questions


board = new Questions.Board()

science = Category("Science")
science.questions.append(
	Question(
		"This is the question",
		"This is the answer",
		100))
board.categories.append(science)

players = Players()
players.add("Player 1")
players.add("Player 2")
		
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
