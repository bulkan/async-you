# チャレンジ

コマンドラインから2つの引数(hostname, port)を受け取るプログラムを作成してください。
`http.request`を使って下記へPOSTしてください。

```js
url + '/users/create'
```

bodyには`JSON.stringify`を含めてください。

```js
{"user_id": 1}
```

これを5回繰り返します。`user_id`プロパティは1から始めてインクリメントしてください。

リクエスト終了後、GET requestを送ってください:

```js
url + '/users'
```

そしてGET requestのresponse bodyを`console.log`へ出力してください。

## ヒント

この問題では、いくつか非同期操作をコーディネートする必要があります。

`async.series`を使用し、`Object`へ渡します。
タスク機能の一つは`http.request`を`使用してPOSTリクエストを送信するために、 `async.times`を使用する必要があります。

`async.times`については下記に詳しく書いてあります。

  https://github.com/caolan/async#times
