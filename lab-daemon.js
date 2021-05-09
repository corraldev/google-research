var net = require('net');

var self = this;
self.server_socket = null;
self.proxy_socket = null;

var server = net.createServer(function(socket) {
    console.log("Server connected!");
    self.server_socket = socket;
});

var proxy = net.createServer(function(socket) {
	console.log("Proxy connection");
    self.proxy_socket = socket;

    proxy.on('data', function(data){
        console.log('Sending data through the tunnel');
    });

    proxy.on('end', function() {
        console.log('Proxy disconnected');
    });
});

// Tunnel
server.listen(8041, '127.0.0.1');

// Proxy
proxy.listen(4420, '127.0.0.1');