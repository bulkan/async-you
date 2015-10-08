## Challenge

Write a program that will receive a URL as the first command line argument.

To this URL, for each of the values in the following array, send a GET request
using `http.get` with a query parameter named `number` set at the proper value:

```js
['one', 'two', 'three']
```

Each time, convert the response body to `Number` and add it to the previous value.
`console.log` the final reduced value.

## Hints

Use `async.reduce`:

  https://github.com/caolan/async#reduce
