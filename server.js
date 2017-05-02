var serverFactory = require('spa-server');

var server = serverFactory.create({
    port: 80,
    fallback: '/index.html'
});

server.start();