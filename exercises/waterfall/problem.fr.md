Dans Node.js comme dans les navigateurs, il y a trois façons de faire du
JavaScript **asynchrone**.

La première approche nous emmène tout droit dans l’**Enfer des Callbacks**.
Il est possible de mitiger ce phénomène en suivant les conseils listés ici :

  http://callbackhell.com

La deuxième méthode consiste à utiliser une implémentation des *Promesses*.
Utiliser des promesses peut simplifier votre code mais introduit un niveau
d’abstraction supplémentaire.

Finalement, vous pouvez utiliser le module `async` de Caolan McMahon. Avec
**async**, vous écrivez toujours des fonctions de rappel, mais sans tomber
dans l’enfer des callbacks ni ajouter une nouvelle couche d’abstraction.

Il arrive bien souvent que vous ayez besoin d’exécuter de multiples appels
asynchrones l’un après l’autre, en passant à chaque appel le résultat du
précédent.  C’est facile à réaliser avec l’aide de `async.waterfall()`.

Par exemple, le code qui suit fait deux traitements consécutifs :

1) Une requête GET à `http://localhost:3131` dans la première fonction de la
   cascade ;
2) Un `JSON.parse` sur le corps de réponse obtenu, passé par la première fonction
   de la cascade via sa propre fonction de rappel, et transmis en premier argument
   à la deuxième fonction de la cascade ; on en extrait alors la propriété `port`
   et on fait une nouvelle requête GET avec.

```js
var http = require('http')
  , async = require('async');

async.waterfall([
  // Première fonction de cascade ; `cb` est le rappel de continuation
  // passé par `async`, à appeler quand on aura terminé cette étape.
  function(cb){
    // La réponse sera un encodage JSON de l’objet `{port: 3132}`
    fetchURL("http://localhost:3131", cb);
  },

  // Deuxième fonction de cascade : la valeur passée par la première à
  // son `cb` est transmise en 1er argument, et ce nouveau `cb` est
  // toujours une fonction de continuation passée par `async`.
  function(body, cb){
    var port = JSON.parse(body).port;
    fetchURL("http://localhost:" + port, cb);
  }
],
// Gestionnaire d’erreur / de résultat global à la cascade.
function(err, result){
  if (err) return console.error(err);
  console.log(result);
});

function fetchURL(url, cb) {
  var body = '';
  http.get(url, function(res){
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
```

## Défi

Pour cet exercice vous devrez écrire un programme qui lise le contenu
d’un fichier, de façon asynchrone évidemment.

Le chemin de ce fichier vous sera fourni en premier argument de la ligne
de commande de votre programme (`process.argv[2]`).

Le fichier contient une unique URL.  Utilisez `http.get` pour créer une
requête GET vers cette URL et faire un `console.log` sur le corps de réponse.
