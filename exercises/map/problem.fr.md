Avec `async.each()`, les résultats des fonctions asynchrones sont **perdus**.

C’est pourquoi on utilise souvent `async.map()`.  Elle fait la même chose
que `async.each()`, mais lorsqu’elle itère de façon asynchrone sur le tableau,
elle **récupère les résultats** et les passe à terme à la fonction de rappel
qui leur est dédiée.

Ces résultats sont présentés dans un tableau qui **respecte l’ordre** du tableau
de valeurs d’origine.

Par exemple, le code de l’exercice **each** peut être écrit comme suit :

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
  // `results`est un tableau des corps de réponse, dans le bon ordre
});
```

## Défi

Écrivez un programme avec deux URLs en arguments de ligne de commande.

Utilisez `http.get()` pour créer deux requêtes GET sur ces URLs.

Utilisez `async.map()` et faites à terme un `console.log()` du tableau
des résultats.
