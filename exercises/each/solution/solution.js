var http = require('http')
  , async = require('async');

async.each(process.argv.slice(2), function(item, done){
  http.get(item, function(res){
    res.on('data', function(chunk){
    });

    res.on('end', function(){
      done(null);
    });
  }).on('error', function(err){
    done(err);
  });
},
function(err){
  if(err) console.log(err);
});
