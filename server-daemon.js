var net = require('net');


var client = new net.Socket();
var local = new net.Socket();
function initLocal() {
    local = new net.Socket();
    local.connect(9229, '127.0.0.1', function() {
        console.log("[LOCAL CONNECTED]");
    });
    local.on('data', function(data){
        console.log('[LOCAL] -> [PROXY]: ' + data);
        client.write(data);
        //local.destroy();
    });
    

    local.on('end', function(data){
        initLocal();
    });

}



client.connect(8041, '185.238.51.205', function() {
	console.log('Connected');
	initLocal();
    //client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('[PROXY] -> [LOCAL]: ' + data);
    local.write(data);
});

client.on('close', function() {
	console.log('Connection closed');
    process.exit();
});