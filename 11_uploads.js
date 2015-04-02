var Hapi = require('hapi');
var Joi  = require('joi');

var server = new Hapi.Server();

server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

function uploadHandler(request, reply) {
  var file = request.payload.file;

  var response = {
    description: request.payload.description,
    file: {
      data: '',
      filename: file.hapi.filename,
      headers: file.hapi.headers
    }
  };

  file.on('data', function (data) { response.file.data += data; });
  file.on('end', function () { reply(response); });
}

var uploadConfig = {
  handler: uploadHandler,
  payload: {
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data'
  },
  validate: {
    payload: {
      description: Joi.string().required(),
      file: Joi.required()
    }
  }
};

server.route({ method: 'POST', path: '/upload', config: uploadConfig });

server.start();
