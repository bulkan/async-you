
module.exports = function () {
  var users = [];

  var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() === 'post') {
      
    }
  }).listen(9345);

  return {
      args  : 'http://localhost:9345'
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
}
