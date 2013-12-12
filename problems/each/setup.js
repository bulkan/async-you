var http = require('http');

module.exports = function () {
  var server = http.createServer(function (req, res) {
      res.end('meerkat');
  }).listen(9345);

  return {
      args  : ['http://localhost:9345', 'http://localhost:4242']
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
}
