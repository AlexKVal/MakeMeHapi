var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  port: Number(process.argv[2]) || 8080,
  host: 'localhost'
});

server.state('session', {
  ttl: 10,
  encoding: 'base64json',
  domain: 'localhost',
  path: '/{path*}'
});

function setCookie(request, reply) {
  reply('Cookie set').state('session', {key : 'makemehapi'});
}

function checkCookie(request, reply) {
  var session = request.state.session;
  if (session) {
    reply({ user: 'hapi' });
  } else {
    reply( new Hapi.error.unauthorized('Missing authentication') );
  }
}

var checkCookieConfig = {
  state: {
    parse: true,
    failAction: 'log'
  }
};

server.route({ method: 'GET', path: '/set-cookie', handler: setCookie });
server.route({ method: 'GET', path: '/check-cookie', handler: checkCookie });

server.start();
