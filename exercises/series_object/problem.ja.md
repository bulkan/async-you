この問題では、 `async.series`を使用する方法を学習します。

`waterfall`と`series`の主な違いは、一度終了した`async.series`タスク関数からの結果は、
**次に渡されないこと**です。
` series`は配列としてすべての結果を収集し、**全てのタスクが完了したら**、
**オプションのコールバック**に渡します。
例えば:

```js
async.series([
  function(callback){
    setTimeout(function() {
      callback(null, 'one');
    }, 200);
  },
  function(callback){
    setTimeout(function() {
      callback(null, 'two');
    }, 100);
  }
],
// optional callback
function(err, results){
  // results is now equal to ['one', 'two']
});
```

配列を使う代わりに`async.series`コンテナを使って各プロパティを実行し、
同じプロパティを持つ結果オブジェクトを作成します。
上記の例は、以下のように記述できます。

```js
async.series({
  one: function(done){
    done(null, '1');
  },
  two: function(done){
    done(null, '2');
  }
}, function(err, results){
  console.log(results);
  // results will be {one: 1, two: 2}
});
```

## チャレンジ

第１、第２引数として２つのURLを受け取るプログラムを書いてください。

`http.get`を使い、これらのURLにGETリクエストを作成し、コールバックにレスポンスボディを
渡します。

プロパティ名に`requestOne`と`requestTwo`を使用し、`async.series`へ
タスク機能のオブジェクトを渡します。

全てのタスクが終了したら、シリーズのコールバック結果を`console.log`へ出力します。
