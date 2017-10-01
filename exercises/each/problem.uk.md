Час від часу ви б хотіли викликати одну і ту ж саму функцію декілька разів, але
з різними параметрами, **не турбуючись по те, які дані повертаються**, але
перевіряючи, чи призводять виклики до помилок.

В даному випадку буде корисним `async.each`.

Наприклад, наступний код здійснює три виклики та використовує значення із масиву:

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

## Завдання

Написати програму, яка отримує два URL, як перший та другий аргументи командної строки.

Потім, використовуючи `http.get`, зробити два GET запити, по одному на кожен URL,
і `console.log` на будь-які помилки.
