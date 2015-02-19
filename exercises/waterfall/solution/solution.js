var fs = require('fs')
  , http = require('http')
  , async = require('async');

async.waterfall([
  function(done){
    fs.readFile(process.argv[2], function(err, data){
      if (err) return done(err);
      done(null, data)
    });
  },

  function(data, done){
    var body = '';
    http.get(data.toString().trimRight(), function(res){
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
], function(err, result){
  if (err) return console.error(err);
  console.log(result);
});
