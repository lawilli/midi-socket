var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname+ '/public'));

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/listener', function (req, res, next) {
    res.sendFile(__dirname + '/listener.html');
});

io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('play', function (data) {
        console.log(data);
        console.log('note played');
        //client.emit('broad', data);
        client.broadcast.emit('broad', data);
    });

});

server.listen(4200);
