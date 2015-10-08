Dans cet exercice, vous apprendrez à utiliser `async.series()`.

La principale différence entre `waterfall` et `series` est que le résultat d’une
tâche dans `async.series()` **ne sera pas passé à la suivante** fonction à traiter.
`series` va **récupérer tous les résultats dans un tableau** et passer celui-ci
à terme à la **fonction de rappel optionnelle**, une fois que **toutes les tâches
sont terminées**.  Par exemple :

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
// Fonction de rappel optionnelle
function(err, results){
  // `results` vaut désormais ['one', 'two']
});
```

À la place d’un tableau, `async.series()` vous permet d’utiliser un objet,
dont chaque valeur est une fonction de tâche qui sera exécutée, auquel cas
le résultat sera un objet avec des propriétés homonymes qui indiquent les
résultats.  L’exemple ci-dessus peut être réécrit comme suit :

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
  // `results` sera {one: 1, two: 2}
});
```

## Défi

Écrivez un programme qui recevra deux URLs comme premier et second arguments
de la ligne de commande.

Utilisez `http.get()` pour créer une requête GET sur chaque URL, et passez
leur corps de réponse à la fonction de rappel.

Utilisez un objet de fonctions de tâche pour `async.series()`, avec des
propriétés nommées `requestOne` et `requestTwo`.

Faites un `console.log` sur les résultats dans la fonction de rappel finale,
une fois toutes les tâches terminées.
