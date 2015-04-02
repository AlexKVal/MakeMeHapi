var Hapi = require('hapi');
var Joi  = require('joi');

var server = new Hapi.Server();

server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.route({
  path: '/chickens/{breed}',
  method: 'GET',
  handler: { view: 'index' },
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});

server.start();
