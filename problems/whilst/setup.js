var http = require('http');


var max = Math.floor(Math.random() * 5) + 1;
max = (max == 1 ? 2: max)

module.exports = function () {
  var count = 0;
  var server = http.createServer(function (req, res) {
    if (count >= max) {
      res.end('meerkat');
    } else {
      ++count;
      res.end();
    }
  }).listen(9345);

  return {
      args  : 'http://localhost:9345'
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
}
