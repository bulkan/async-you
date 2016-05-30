В Node.js и браузерах есть 3 способа реализовать **асинхронный** JavaScript.

Первый путь приводит к тому, что мы называем **Callback Hell**.
Callback Hell можно свести к минимуму, следуя следующим советам:
  http://callbackhell.com.

Другой метод заключается в использовании пакета `Promise`. Используя `Promise`
можно упростить код, но он также добавляет еще один уровень абстракции.

Последний метод заключается в использовании пакета `async`, созданного Caolan McMahon.
Благодаря **async** мы все еще пишем функции обратного вызова, но без использования
Callback Hell или добавления другого уровня абстракции от Promise.

Чаще всего вам нужно будет сделать несколько асинхронных вызовов один за другим и
каждый вызов будет в зависимости от результата предыдущего асинхронного вызова.
Мы можем сделать это с помощью `async.waterfall`.

Для примера рассмотрим следующий код:

1) Делаем запрос GET на `http://localhost:3131` в функции waterfall.
2) Тело ответ передается в качестве аргумента к следующей функции waterfall через
   обратный вызов. Вторая функция в waterfall принимает тело как
   параметр и использует `JSON.parse`, чтобы получить свойство `port`,
   чтобы сделать другой GET запрос.

```js
var http = require('http')
  , async = require('async');

async.waterfall([
  function(cb){
    var body = '';
    // ответ - это закодируемый JSON-объект, как следующий пример {порт: 3132}
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

## Задание

В этой задаче вам нужно написать программу, которая будет считывать содержимое файла.

Путь к файлу будет передан, как первый аргумент в командной строке
(т.е `process.argv[2]`).

Файл будет содержать один URL. Используйте `http.get`, чтобы сделать GET запрос на
этот URL и напишите `console.log`, чтобы вывести тело ответа.
