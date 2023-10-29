const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Configuración de servidor web para servir archivos estáticos (página HTML)
app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');

  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);

    // Transmitir el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(8080, () => {
  console.log('Servidor WebSocket y página web en ejecución en el puerto 8080');
});
