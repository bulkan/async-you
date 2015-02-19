var http = require('http');


var max = Math.floor(Math.random() * 5) + 1;
max = (max == 1 ? 2: max)

var port1= 9345, port2 = 9346;

module.exports = function () {
  var servers = [];

  function startServer(port){
    var count = 0;
    var server = http.createServer(function (req, res) {
      if (count >= max) {
        res.end('meerkat');
      } else {
        ++count;
        res.end();
      }
    }).listen(port);
    servers.push(server);
  }

  startServer(port1);
  startServer(port2);

  function stopServers(){
    servers.forEach(function(server){ server.close(); });
  }

  return {
      submissionArgs: 'http://localhost:' + port1
    , solutionArgs: 'http://localhost:' + port2
    , stdin : null
    , long  : true
    , close : stopServers
  }
}
