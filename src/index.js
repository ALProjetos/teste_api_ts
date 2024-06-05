const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world! V4');
});

app.post('/send-message', (req, res) => {
    const message = req.body.message;
    io.emit('receiveMessage', message);
    console.log(`receiveMessage [${JSON.stringify(message)}]`);
    res.status(200).send({ status: 'Message sent' });
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        console.log(`sendMessage [${JSON.stringify(message)}]`);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
