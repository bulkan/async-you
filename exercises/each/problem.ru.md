Время от времени вы бы хотели вызывать одну и ту же функцию несколько раз, но
с разными параметрами, **не беспокоясь о том, какие данные возвращаются**, но
проверяя, если вызовы выдают ошибки.

В данном случае будет полезен `async.each`.

Например, следующий код будет делать три вызова и использовать значения в массиве:

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

## Задача

Создать программу, которая получает два URL, как первый и второй аргументы командной строки.

Затем, используя `http.get`, чтобы сделать два GET запроса, по одному на каждый URL,
и `console.log` на любые ошибки.
