var net = require('net');

var self = this;
self.server_socket = null;
self.proxy_socket = null;

var server = net.createServer(function(socket) {
    console.log("Server connected!");
    self.server_socket = socket;
    self.server_socket.on('data', (data) => {
        console.log("SERVER -> PROXY" + data);
        try { 
            if (!self.proxy_socket._disconnected_){
                self.proxy_socket.write(data);
            }
        }
        catch (e){
            console.log('error');
        }
        //self.proxy_socket.destroy();
    })
});

var proxy = net.createServer(function(socket) {
	console.log("Proxy connection");
    self.proxy_socket = socket;

    self.proxy_socket.on('data', function(data){
        console.log('Sending data through the tunnel');
        console.log("PROXY -> SERVER: "+ data);
        try { self.server_socket.write(data); } 
        catch(e) {
            console.log("No proxy connected");
        }
    });

    self.proxy_socket.on('end', function() {
        console.log('Proxy disconnected');
        self.proxy_socket._disconnected_ = true;
    });
});

// Tunnel
server.listen(8041, '192.168.18.2');

// Proxy
proxy.listen(9229, '127.0.0.1');