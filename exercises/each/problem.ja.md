時折、同じ関数を複数回呼び出したいときがあるでしょう。しかし異なる入力で、**戻り値を考慮せずに**
しかしエラーはチェックしたい。

このようなときに`async.each`は便利です。

例えば、次のように配列を使って３回コールする例を見てみましょう。

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

## チャレンジ

コマンドラインからfirstとsecondの２つのURLを受け取るプログラムを作成してください。
その時、`http.get`を使い、URLを受け取るGET requestを作り、エラーがあれば`console.log`に出力してください。
