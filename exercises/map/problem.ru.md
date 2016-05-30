С `async.each`, результаты асинхронной функции будут **потеряны**.

На помощь приходит `async.map`. Он делает то же самое, что и `async.each`,
путем вызова асинхронной функции итератора на массив, но **собирает результаты**
асинхронной функции итератора и передает результат в функцию обратного вызова.

Результаты представлены в виде массива, которые находятся **в том же порядке**,
что и в исходном массиве.

Пример в EACH-задаче можно записать в виде:

```js
var http = require('http')
  , async = require('async');
async.map(['cat', 'meerkat', 'penguin'], function(item, done){
  var opts = {
    hostname: 'http://httpbin.org',
    path: '/post',
    method: 'POST'
  };
  var body = '';
  var req = http.request(opts, function(res){
    res.on('data', function(chunk){
      body += chunk.toString();
    });
    res.on('end', function(){
     return done(null, body);
    });
  });
  req.write(item);
  req.end();
},
function(err, results){
  if (err) return console.log(err);
  // Результаты - это массив тел ответов в том же порядке.
});
```

## Задача

Напишите программу, которая будет принимать два аргумента командной строки для двух URL.

Используйте `http.get`, чтобы создать два GET-запроса по этим URL.

Вам нужно будет использовать `async.map`, затем используйте `console.log` для результата.
