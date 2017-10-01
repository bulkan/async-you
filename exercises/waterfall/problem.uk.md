В Node.js та бра́узерах є 3 способи реалізувати **асинхронний** JavaScript.

Перший призводить до того, що ми називаємо **Callback Hell**.
Callback Hell можна звести до мінімуму, якщо слідувати порадам:
  http://callbackhell.com.

Другой заключаєтся в використанні пакету `Promise`. Використовуючи `Promise`
можна спростити код, але він також добавляє ще один рівень абстракції.

Останній метод заключаєтся у використанні пакету `async`, створеного Caolan McMahon.
Завдяки **async** ми все ще пишемо функції зворотнього виклику, але без використання
Callback Hell чи додавання додаткового рівня абстракції від Promise.

Найчастіше у вас буде необхідність робити декілька асинхронних викликів один за одним і
кожен виклик буде в залежності від результату попереднього асинхронного виклику.
Ми можемо зробити це за допомогою `async.waterfall`.

Для прикладу розглянемо наступний код:

1) Робимо запит GET на `http://localhost:3131` в функції waterfall.
2) Тіло-відповідь передаєтся в якості аргументу до наступної функції waterfall через
   зворотній виклик. Друга функція в waterfall приймає тіло як
   параметр і використовує `JSON.parse`, щоб отримати властивість `port`
   та зробити інший GET запит.

```js
var http = require('http')
  , async = require('async');

async.waterfall([
  function(cb){
    var body = '';
    // відповідь - це закодований JSON-об'єкт, як наступний приклад {порт: 3132}
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

## Завдання

В цьому завданні вам потрібно написати програму, яка буде зчитувати вміст файлу.

Шлях до файлу буде переданий, як перший аргумент командної строки
(тобто `process.argv[2]`).

Файл буде містити один URL. Використайте `http.get`, щоб зробити GET запит на
цей URL і `console.log`, щоб вивести тіло відповіді.
