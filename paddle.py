from gpiozero import Button, LED
from datetime import datetime
from game import buttonPressed

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
		game.buttonPressed(self)

