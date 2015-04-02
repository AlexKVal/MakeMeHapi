var fs = require('fs');
var path = require('path');
var rot13 = require("rot13-transform");
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: Number(process.argv[2] || 8080),
  host: 'localhost'
});

server.route({
  path: '/',
  method: 'GET',
  handler: function (request, reply) {
    reply(fs.createReadStream(path.join(__dirname, 'rot13.txt')).pipe(rot13()));
  }
});

server.start(function () {
  console.log('up');
});
