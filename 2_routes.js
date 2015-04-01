var Server = require('hapi').Server;
var server = new Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/{name}',
  method: 'GET',
  handler: function (request, reply) {
    reply('Hello ' + encodeURIComponent(request.params.name));
  }
});

server.start();
