var path = require('path');
var Server = require('hapi').Server;
var server = new Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/',
  method: 'GET',
  handler: {
    file: path.join(__dirname, 'index.html')
  }
});

server.start();
