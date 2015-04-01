var path = require('path');
var Server = require('hapi').Server;
var server = new Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'templates')
});

server.route({
  path: '/',
  method: 'GET',
  handler: {
    view: 'index.html'
  }
});

// '?name=Handling'
// 'templates/index.html'

server.start(function () {
  console.log('listening at', server.info.uri);
});
