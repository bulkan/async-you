In Node.js and browsers there are three ways to do **asynchronous** JavaScript.

The first way leads to what we call **Callback Hell**. Callback Hell
can be minimized by following the tips at:

  http://callbackhell.com.

Another method is to use a `Promise` package. Using promises will simplify your
code but it also adds another layer of abstraction.

The last method is by using the `async` package by Caolan McMahon.  With **async**
we are still writing callbacks but without falling into the callback hell or
adding another layer of abstraction with promises.

More often than not you will need to do multiple asynchronous calls one after
the other with each call dependent on the result of previous asynchronous call.
We can do this with the help of `async.waterfall`.

For example the following code will:

1) do a GET request to `http://localhost:3131` in the first waterfall function.
2) The response body is passed as an argument to the next waterfall function via
   the callback. The second function in the waterfall accepts the body as a
   parameter and `JSON.parse`'s it to get to the `port` property then it does
   another GET request.

```js
var http = require('http')
  , async = require('async');

async.waterfall([
  function(cb){
    var body = '';
    // response is JSON encoded object like the following {port: 3132}
    http.get("http://localhost:3131", function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });
      res.on('end', function(){
        cb(null, body);
      });
    }).on('error', function(err) {
      cb(err);
    });
  },

  function(body, cb){
    var port = JSON.parse(body).port;
    var body = '';
    http.get("http://localhost:" + port, function(res){
      res.on('data', function(chunk){
        body += chunk.toString();
      });
      res.on('end', function(){
        cb(null, body);
      });
    }).on('error', function(err) {
      cb(err);
    });
  }
], function(err, result){
  if (err) return console.error(err);
  console.log(result);
});
```

## Challenge

In this problem you will need to write a program that first reads the contents
of a file.

The path will be provided as the first command-line argument to your program
(i.e. `process.argv[2]`).

The file will contain a single URL. Using `http.get`, create a GET request to
this URL and `console.log` the response body.
