## チャレンジ

コマンドライン引数にURLを1つ受け取るプログラムを作成してください。

`async.whilst`と`http.get`を使用して、レスポンスボディは、文字列`"meerkat"`を
含むまでこのURLにGETリクエストを送信します。

"meerkat"の文字列を取得するために必要なGET Requestの量を`console.log`へ出力してください。

## ヒント

`String.prototype.trim()`が力になるでしょう。

`async.whilst()`のドキュメントはこちらにあります:

  https://github.com/caolan/async#whilst
