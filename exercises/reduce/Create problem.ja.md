## チャレンジ

最初のコマンドライン引数にURLを受け取るプログラムを作成してください。

このURLには、以下の配列の値のそれぞれについて、`http.get`を使用してGETリクエストを送信します。
`number`という名前のクエリパラメータを適切な値に設定してください。

```js
['one', 'two', 'three']
```

毎回`Number`をレスポンスボディに変換し、前の値を足します。
計算結果を`console.log`へ出力してください。

## ヒント

`async.reduce`を使用してください。

  https://github.com/caolan/async#reduce
