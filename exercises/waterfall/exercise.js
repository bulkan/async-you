var http  = require('http');

module.exports = function () {
  var server = http.createServer(function (req, res) {
      res.end('boom!')
  }).listen(9345)

  return {
      args  : [
        __dirname + '/url.txt'
      ]
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
}
