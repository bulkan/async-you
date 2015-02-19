## Challenge

Write a program that will receive a single command line argument to a URL.

Using `async.whilst` and `http.get`, send GET requests to this URL until
the response body contains the string `"meerkat"`.

`console.log` the amount of GET requests needed to retrieve the "meerkat" string.

## Hints

`String.prototype.trim()` is your friend.

You can get documentation on `async.whilst()` here:

  https://github.com/caolan/async#whilst
