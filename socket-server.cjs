// socket-server.cjs
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado');
  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado');
  });
});

server.listen(3001, () => {
  console.log('🚀 Socket.IO server corriendo en http://localhost:3001');
});

// Endpoint para emitir eventos desde tu API
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/emit', (req, res) => {
  const { type, data } = req.body;
  io.emit(type, data);
  res.send({ status: 'ok' });
});

app.listen(3002, () => {
  console.log('🌐 Endpoint REST escuchando en http://localhost:3002/emit');
});
