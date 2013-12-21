var http = require('http');

module.exports = function () {
  var users = [];

  var server = http.createServer(function (req, res) {
    var body = "";
    if (req.method.toLowerCase() === 'post') {
      req.on('data', function(chuck){
        body += chuck.toString();
      });

      req.on('end', function(){
        users.push(JSON.parse(body));
        res.end();
      });
    } else {
      res.end(JSON.stringify({'users': users}));
    }
  }).listen(9345);

  return {
      args  : ['localhost', 9345]
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
}
