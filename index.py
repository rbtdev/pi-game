from players import Players
from time import sleep
from flask import Flask, render_template
from flask_sockets import Sockets

app = Flask(__name__)
app.debug = True

sockets = Sockets(app)

players = Players()
players.add("Player 1")

@sockets.route('/blink')
def blink_socket(ws):
    while True:
        message = ws.receive()
        if (message == "on"):
          players.list[0].on()
          ws.send("ON")
        elif (message == "off"):
          players.list[0].off()
          ws.send("OFF")

button_ws = None
@sockets.route('/button')
def button_socket(ws):
    global button_ws
    button_ws = ws
    players.setCurrent(None)
    players.buttonPushedEvent.clear()
    players.setButtonPressedCb(buttonPressed)
    players.enable()
    while True:
	message = ws.receive()

def buttonPressed():
	global button_ws
        button_ws.send(players.current.name)
	players.setCurrent(None)
        players.buttonPushedEvent.clear()
	players.enable() 

@sockets.route('/echo')
def echo_socket(ws):
    while True:
        message = ws.receive()
	print message
        ws.send("Hello")

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/echo_test', methods=['GET'])
def echo_test():
    return render_template('echo_test.html')

if __name__ == "__main__":
#    app.run(host='0.0.0.0')
	from gevent.pywsgi import WSGIServer
	from geventwebsocket.handler import WebSocketHandler
	server = WSGIServer(("0.0.0.0", 5000), app, handler_class=WebSocketHandler)
	server.serve_forever()
