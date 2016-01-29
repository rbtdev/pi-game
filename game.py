from time import sleep
from players import Players
from questions import Question, Board, Category

board = Board()

science = Category("Science")
science.questions.append(
	Question(
		"This is the question",
		"This is the answer",
		200))
science.questions.append(
	Question(
		"This is the question",
		"This is the answer",
		100))
science.questions.append(
	Question(
		"This is the question",
		"This is the answer",
		300))
science.questions.append(
	Question(
		"This is the question",
		"This is the answer",
		500))
science.questions.append(
	Question(
		"This is the question",
		"This is the answer",
		400))

board.categories.append(science)

players = Players()
players.add("Player 1")
players.add("Player 2")
	
for category in board.categories:
	print ("Category - %s" % (category.name))
	for question in sorted(category.questions, key = lambda question: question.points):
		print ("\t%s" % (question.question))
		print ("\t%d" % (question.points))
		
		players.setCurrent(None)
		players.buttonPushedEvent.clear()
		players.enable()
		players.buttonPushedEvent.wait(10)
		if players.current != None:
			print(players.current.name)
			players.current.on()
			print("%s - Please Answer. You have 10 seconds - "% (players.current.name ))
			sleep(3)
			players.current.off()
			correct = raw_input("Did you get it right?")
			if (correct == "yes"):
				players.current.score+=question.points
			else:
				players.current.score -= question.points
			print("%s - your score is now %d" % (players.current.name, players.current.score))
		else:
			print("Nobody buzzed.!")
			print("The answer is: %s" %(question.answer))
