var http = require('http')
  , url = require('url');

var numbers = {'one': 1, 'two': 2, 'three': 3};

module.exports = function () {
  var server = http.createServer(function (req, res) {
    var number = url.parse(req.url, true).query.number;
    res.end((numbers[number]).toString());
  }).listen(9345);

  return {
      args  : 'http://localhost:9345'
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
}
