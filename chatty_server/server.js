// server.js

const express = require('express');
const webSocket = require('ws')
const SocketServer = webSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send('{type: "connection"}')

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
    if(data.type === 'updateUsername') {
      messageObj.type = 'incomingNotification';
    } else {
      messageObj.type = 'incomingMessage'
    }
    wss.broadcast(messageObj)
  })
  let onlineUsers = {type: "onlineUsers", count: wss.clients.size};
  wss.broadcast(onlineUsers)
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    ws.send('type: disconnection')
    }
  );
});