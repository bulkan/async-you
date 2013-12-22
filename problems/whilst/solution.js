var http = require('http')
  , async = require('async');


var requestBody = '';

var count = 0;

async.whilst(
  function() {
    return !/meerkat/.test(requestBody.trim());
  },

  function(done){
    var body = '';
    http.get(process.argv[2], function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });

      res.on('end', function(){
        requestBody = body;
        ++count;
        done();
      });
    }).on('error', done);
  },

  function(err){
    if (err) return console.log(err);
    console.log(count);
  }
)
