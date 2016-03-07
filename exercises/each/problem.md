Occasionally you will want to call the same function multiple times, but with
different inputs, **without caring about the return data** but to check if any call
throws an error (sometimes not even that).

This is where `async.each` is useful.

For example, the following will make three calls using the values in the array:

```js
var http = require('http')
  , async = require('async');
async.each(['cat', 'meerkat', 'penguin'], function(item, done){
  var opts = {
    hostname: 'http://httpbin.org',
    path: '/post',
    method: 'POST'
  };
  var req = http.request(opts, function(res){
    res.on('data', function(chunk){
    });
    res.on('end', function(){
     return done();
    });
  });
  req.write(item);
  req.end();
},
function(err){
  if (err) console.log(err);
});
```

## Challenge

Create a program that will receive two URLs as the first and second command-line
arguments.

Then using `http.get`, create two GET requests, one to each URL, and `console.log`
any errors.
