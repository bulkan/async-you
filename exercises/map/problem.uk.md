З `async.each` результати асинхронної функції будуть **втрачені**.

На допомогу приходить `async.map`. Він робить те ж саме, що і `async.each`,
шляхом виклику асинхронної функції ітератора на масив, але **збирає результат**
асинхронної функції ітератора і передає його в функцію зворотнього виклику.

Результати будуть представлені у вигляді масиву, який знаходитиметься **в тому ж порядку**,
що і у вхідному масиві.

Приклад в EACH-завданні можна записати в такому вигляді:

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
  // Результати - це масив тіл відповідей в тому ж порядку.
});
```

## Завдання

Напишіть програму, яка прийматиме два аргументи командної строки для двох URL.

Використайте `http.get`, щоб здійснити два GET-запити по цим URL.

Вам буде потрібно використати `async.map`, а потім `console.log` для результуючого масиву.
