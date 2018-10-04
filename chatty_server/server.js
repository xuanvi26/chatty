const express = require('express');
const webSocket = require('ws')
const SocketServer = webSocket.Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

function randomColor() {
  let hex = '0123456789ABCDEF';
  let color = '#';
  for(let i = 0; i < 6; i++) {
    color += hex.charAt(Math.floor(Math.random() * 16));
  }
  return color;
}

function checkURL(url) {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  let userColor = randomColor();
  let userName = 'Anonymous';
  
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if(client.readyState === webSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  wss.broadcast({type: "onlineUsers", count: wss.clients.size})
  wss.broadcast({type: "connectUser", username: userName})

  ws.on('message', function incoming(data) {
    messageObj = JSON.parse(data)
    messageObj.id =  uuidv1()
    messageObj.userColor = userColor;
    userName = messageObj.username;
    if(checkURL(messageObj.content)) {
      messageObj.type ='incomingImage';
    } else {
      messageObj.type = 'incomingMessage';
    }
    wss.broadcast(messageObj);
  });

  ws.on('close', () => {
    wss.broadcast({type: 'onlineUsers', count: wss.clients.size})
    wss.broadcast({type: 'disconnectUser', username: userName})
    console.log('Client disconnected')
  });
});
