Node.jsとブラウザで**非同期**JavaScriptを行うには、次の3つの方法があります。

最初の方法は、**コールバック地獄**と呼ぶものにつながります。
コー​​ルバック地獄は以下のサイトでのヒントに従うことによって最小限に抑えることができます。

  http://callbackhell.com.

別の方法は、 `Promise`パッケージを使用することです。
`Promise`パッケージを使用すると、コードは簡素化しますが、抽象化のための別のレイヤーを追加します。

最後の方法は、Caolan McMahonが作成した `async`パッケージを使用することです。
`async`パッケージを使用すると、コールバックは書きますが、コールバック地獄に落ちたり、
`Promise`パッケージを使って抽象化のための別のレイヤーを追加することはありません。

多くの場合、先に実行した非同期呼び出しの実行結果によって、
複数の非同期呼び出しを連続して実行する必要あります。

たとえば、次のようなコードです：

1) 最初のウォーターフォール関数で`http://localhost:3131`をGET request します。

2) レスポンスボディは、コールバックを介して次のウォーターフォール関数の引数として渡されます。
ウォーターフォールの次の機能はパラメーターとしてボディを受け入れ、
`port`プロパティを取得するため`JSON.parse`し、別のGET requestをします。

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

## チャレンジ

この問題では、最初のファイルの内容を読み取るプログラムを作成する必要があります。

パスはプログラムの最初のコマンドライン引数として提供されます
（`process.argv [ 2 ]` ） 。

ファイルには、単一のURLが含まれています。
`http.get`を使用して、このURLにGETリクエストを作成し、 レスポンスボディを`console.log`へ出力します 。
