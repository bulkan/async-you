var http  = require('http')
  , url = require('url');

module.exports = function () {
  var server = http.createServer(function (req, res) {
    if(url.parse(req.url).pathname === '/one')
      return setTimeout(function() {
        res.end('one is smaller than 2');
      }, 100);
    res.end('two greater than one');
  }).listen(3131)

  return {
      args  : ['http://localhost:3131/one', 'http://localhost:3131/two']
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
};
