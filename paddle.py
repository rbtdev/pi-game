from gpiozero import Button, LED
from datetime import datetime


class Paddle:
	def __init__(self, owner, buttonPin, ledPin, buttonPressCb):
		self.owner = owner
		self.button = Button(buttonPin)
		self.led = LED(ledPin)
		self.led.off()
		self.pressedAt = None
		self.buttonPressCb = buttonPressCb

	def enable(self):
		self.button.when_pressed = self.handleButtonPress
	
	def disable(self):
		self.button.when_pressed = None
	
	def handleButtonPress(self):
		self.pressedAt = datetime.now()
		print(self.pressedAt)
		self.buttonPressCb(self)

