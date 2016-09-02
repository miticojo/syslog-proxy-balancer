var PORT = 5140;
var HOST = '192.168.0.141';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');

var send = function (message) {
    client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST + ':' + PORT);
        client.close();
    });
};
for (var i = 0; i < 9; i++) {
    send( i + '-' + message);
}