var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.views({
  engines:{
    html: require('handlebars')
  },
  relativeTo: __dirname,
  path: 'templates',
  helpersPath: 'helpers'
});

server.route({
  path: '/',
  method: 'GET',
  handler: {
    view: 'index'
  }
});

server.start(function () {
  console.log('up');
});
