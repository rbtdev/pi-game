from paddles import Paddles
from time import sleep
from flask import Flask, render_template
from flask_sockets import Sockets
import json

app = Flask(__name__)
app.debug = True

sockets = Sockets(app)

paddles = Paddles()

button_ws = None
@sockets.route('/button')
def button_socket(ws):
    global button_ws
    button_ws = ws
    paddles.setCurrent(None)
    paddles.buttonPushedEvent.clear()
    paddles.setButtonPressedCb(buttonPressed)
    paddles.enable()
    while True:
	   message = ws.receive()

def buttonPressed():
	global button_ws
    print(str(paddles.current.id))
    button_ws.send(str(paddles.current.id))
	paddles.setCurrent(None)
    paddles.buttonPushedEvent.clear()
	paddles.enable() 

@app.route('/')
def hello():
    return render_template('index.html')

if __name__ == "__main__":
#    app.run(host='0.0.0.0')
	from gevent.pywsgi import WSGIServer
	from geventwebsocket.handler import WebSocketHandler
	server = WSGIServer(("0.0.0.0", 5000), app, handler_class=WebSocketHandler)
	server.serve_forever()
