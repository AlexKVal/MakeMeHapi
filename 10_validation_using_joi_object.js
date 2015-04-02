var Hapi = require('hapi');
var Joi = require('joi');

var server = new Hapi.Server();

server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.route({
  path: '/login',
  method: 'POST',
  config: {
    handler: function (request, reply) {
      reply('login successful');
    },
    validate: {
      payload: Joi.object({
        isGuest: Joi.boolean().required(),
        username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
        accessToken: Joi.string().alphanum(),
        password: Joi.string().alphanum()
      })
      .options({ allowUnknown: true })
      .without('password', 'accessToken')
    }
  }
});

server.start();
