const express = require('express');
const webSocket = require('ws')
const SocketServer = webSocket.Server;
const uuidv1 = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if(client.readyState === webSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  };

  ws.on('message', function incoming(data) {
    messageObj = JSON.parse(data)
    messageObj.id =  uuidv1()
    if(messageObj.type === 'updateUsername') {
      messageObj.type = 'incomingNotification';
    } else {
      messageObj.type = 'incomingMessage'
    }
    wss.broadcast(messageObj)
  })

  let onlineUsers = {type: "onlineUsers", count: wss.clients.size};
  wss.broadcast(onlineUsers)

  ws.on('close', () => console.log('Client disconnected'));
});
