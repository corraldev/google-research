var net = require('net');



var client = new net.Socket();
client.connect(8041, '185.238.51.205', function() {
	console.log('Connected');
	

    

    //client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
    var local = new net.Socket();
    local.connect(8080, '127.0.0.1', function() {
        local.write(data);
    });
    local.on('data', function(data){
        console.log('[LOCAL] -> [PROXY]: ' + data);
        client.write(data);
    });

	console.log('[PROXY] -> [LOCAL]: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
    process.exit();
});