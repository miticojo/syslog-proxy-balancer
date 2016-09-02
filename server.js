var config = require('./config.json');
var dgram = require('dgram');
var udpsocket = dgram.createSocket('udp4');

var nodeidx = 0;
var server = module.exports = {};

server.run = function() {
    udpsocket.on('listening', function () {
        var address = udpsocket.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port + ' with PID ' + process.pid);
    });

    udpsocket.on('message', function (message, remote) {
        if (nodeidx > config.farm.nodes.length-1 ) {
            nodeidx = 0;
        }
        var target = config.farm.nodes[nodeidx];
        nodeidx++;
        var client = dgram.createSocket('udp4');
        var node =  {"host": target.split(":")[0], "port": parseInt(target.split(":")[1] || "514")};

        client.send(message, 0, message.length, node.port, node.host, function (err, bytes) {
            if (err) throw err;
            console.log(process.pid + ' - UDP message sent to ' + node.host + ':' + node.port);
            //console.log(process.pid + ' - '+ remote.address + ':' + remote.port + ' - ' + message);
            client.close();
        });
    });

    udpsocket.bind(config.server_port, config.server_host);
};
