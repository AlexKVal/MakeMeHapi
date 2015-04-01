var Server = require('hapi').Server;
var server = new Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/',
  method: 'GET',
  handler: function (request, reply) {
    reply('Hello Hapi');
    // reply({mustFlow: true});
  }
});

server.start();
