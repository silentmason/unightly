const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Chat API');
});

// WebSocket handling (Socket.IO example)
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('message', message); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});