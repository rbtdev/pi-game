class Question:
	def __init__(self, question, answer, points):
		self.question = question
		self.answer = answer
		self.points = points


class Category:
	def __init__(self, name):
		self.name = name
		self.questions = []

	def addQuestion(self, question)
		self.questions.append(question)

class Board:
	def __init__(self):
			categories: []

