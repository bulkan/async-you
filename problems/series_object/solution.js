var http = require('http')
  , async = require('async');

async.series({
  requestOne: function(done){
    var body = '';
    http.get(process.argv[2], function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });

      res.on('end', function(chunk){
        done(null, body);
      });
    }).on('error', function(e){
      done(e);
    });
  },
  requestTwo: function(done){
    var body = '';
    http.get(process.argv[2], function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });

      res.on('end', function(chunk){
        done(null, body);
      });
    }).on('error', function(e){
      done(e);
    });
  }
},
function(err, result){
  if (err) return console.error(err);
  console.log(result);
});
