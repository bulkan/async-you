"use strict"
const http = require('http')
  , async = require('async');

let requestBody = '';

let count = 0;

async.whilst(
  function(cb) {
    cb(null,!/meerkat/.test(requestBody.trim()));
  },//async v3.x.x

  function(done){
    let body = '';
    http.get(process.argv[2], function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });

      res.on('end', function(){
        ++count;
        requestBody = body;
        done();
      });
    }).on('error', done);
  },

  function(err){
    if (err) return console.log(err);
    console.log(count);
  }
)
