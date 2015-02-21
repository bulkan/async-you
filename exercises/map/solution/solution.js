var http = require('http')
  , async = require('async');

async.map(process.argv.slice(2), function(url, done){
  var body = '';
  http.get(url, function(res){
    res.on('data', function(chunk){
      body += chunk.toString();
    });

    res.on('end', function(){
     return done(null, body);
    });
  });
},
function(err, results){
  if (err) return console.log(err);
  // results is an array of the response bodies in the same order
  console.log(results);
});
