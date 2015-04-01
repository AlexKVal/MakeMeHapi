var path = require('path');
var Server = require('hapi').Server;
var server = new Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({
  path: '/foo/bar/baz/{param}',
  method: 'GET',
  handler: {
    directory: {path: path.join(__dirname, 'public')}
  }
});

server.start();
