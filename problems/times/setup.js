var http = require('http');

module.exports = function () {

    var submissionUsers = [];
    var solutionUsers   = [];

    function handleRequests(req, res, users) {
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
    }

    var server = http.createServer(
        function(req, res){
            handleRequests(req, res, submissionUsers);
        }
    ).listen(9345);

    var server = http.createServer(
        function(req, res){
            handleRequests(req, res, solutionUsers);
        }
    ).listen(9346);

    return {
       submissionArgs  : ['localhost', 9345]
    ,  solutionArgs  : ['localhost', 9346]
    , stdin : null
    , long  : true
    , close : server.close.bind(server)
  }
};
