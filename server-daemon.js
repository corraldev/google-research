var net = require('net');

var local = new net.Socket();

var client = new net.Socket();
client.connect(8041, '185.238.51.205', function() {
	console.log('Connected');
	local.connect(8080, '127.0.0.1', function() {
        console.log('Connected to local');
    });

    local.on('data', function(data){
        client.write(data);
    });

    //client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
    process.exit();
});