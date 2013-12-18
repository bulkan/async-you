var http = require('http')
  , async = require('async');

var url = process.argv[2];

async.series([
  function(done){
    function _addUser(user_id, cb){
      var opts = {
        url: url,
        path: '/users/create'
        method: 'POST',
      };

      var req = http.request(opts, function(res){
        res.on('data', function(chunk){
        });

        res.on('end', function(){
          cb();
        });
      });

      req.on('error', cb);

      req.write(JSON.stringify({'user_id': user_id}));
      req.end();
    }

    async.times(5, function(n, next){
      _addUser(n, function(err){
        next(err);
      });
    }, function(err){
      if (err) return done(err);
      done(null, 'saved');
    });
  },

  function(done){
    http.get(url + '/users', function(res){
      var body = "";
      res.on('data', function(chunk){
        body += chunk.toString();
      });

      res.on('end', function(){
        done(null, body);
      });
    }).on('error', done);
  }

], function(err, result){
  if (err) return console.log(err);
  console.log(result);
});
