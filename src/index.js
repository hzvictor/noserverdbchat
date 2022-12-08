const express = require('express');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



// const shortName = uniqueNamesGenerator({
//     dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
//     length: 2
// }); // big-donkey

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});






io.on('connection', (socket) => {
    console.log('a user connected');
    // io.emit('user in', msg);
    socket.on('user in', (msg) => {
        console.log(msg,88999)
        io.emit('user in', msg);
    });

    socket.on('other info', (msg) => {
        console.log(msg,7777777)
        io.emit('other info', msg);
    });

    socket.on('delete msg', (msg) => {
        console.log(msg,'delete')
        io.emit('delete msg', msg);
    });

    socket.on('new name', (msg) => {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
        io.emit('new name', randomName);
    });




    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        //  io.broadcast.emit('hi');
        console.log('message: ' + msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});