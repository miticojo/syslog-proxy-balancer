var PORT = 5140;
var HOST = '192.168.0.141';

var msg_rfc3164 = "<34>Oct 11 22:14:15 mymachine su: 'su root' failed for lonvick on /dev/pts/8";
var msg_rfc5424 = "<34>1 2003-10-11T22:14:15.003Z mymachine.example.com su - ID47 - BOM'su root' failed for lonvick on /dev/pts/8";

var dgram = require('dgram');
var message = new Buffer(msg_rfc3164);

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