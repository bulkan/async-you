À l’occasion, vous aurez besoin d’appeler la même fonction plusieurs fois,
mais avec des arguments distincts, **sans vous soucier des données retournées**
mais en vérifiant que les appels n’ont pas généré d’erreur (parfois, même
cette vérification vous importera peu).

Dans ce genre de cas, `async.each` est parfait.

Par exemple, le code suivant fait trois appels HTTP basés sur les valeurs
d’un tableau :

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

## Défi

Écrivez un programme qui recevra deux URLs comme premier et second arguments
de sa ligne de commande.

Utilisez `http.get()` pour créer deux requêtes GET sur ces URLs et faites
un `console.log` en cas d’erreur.
