`async.each`を使うと、非同期関数の結果は、 **失われます**。

そこで`async.map`を使いましょう。
これは配列上の非同期イテレータ関数を呼び出して`async.each`と同じことを
しますが、**結果を収集し**コールバックへ渡します。

結果は、元の配列のように**同じ順序**である配列です。

例えば、それぞれの問題の例は次のように記述することができます：

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
  // results is an array of the response bodies in the same order
});
```

## チャレンジ

コマンドラインから２つのURLを受け取るプログラムを作成してください。
`http.get`を使い、URLを受け取るGET requestを２つ作成してください。
`async.map`を使い、`console.log`に結果配列を出力してください。
