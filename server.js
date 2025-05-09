const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3000;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
