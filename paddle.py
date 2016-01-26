from gpiozero import Button, LED
from datetime import datetime

pins =  [
		{
			'buttonPin': 17 ,
			'ledPin': 13 ,
		},
		{
			'buttonPin': 22 ,
			'ledPin': 26 ,
		}
	] 

class Paddle:
	def __init__(self, paddleId, buttonPressCb):
		self.button = Button(pins[paddleId]['buttonPin'])
		self.led = LED(pins[paddleId]['ledPin'])
		self.led.off()
		self.pressedAt = None
		self.buttonPressCb = buttonPressCb

	def enable(self):
		self.button.when_pressed = self.handleButtonPress
	
	def disable(self):
		self.button.when_pressed = None
	
	def handleButtonPress(self):
		self.pressedAt = datetime.now()
		self.buttonPressCb(self)

