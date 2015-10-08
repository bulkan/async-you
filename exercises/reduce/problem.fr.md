## Défi

Écrivez un programme qui reçoit une URL en premier argument de ligne de
commande.

Pour chaque valeur du tableau suivant, envoyez une requête GET à cette URL,
à l’aide de `http.get()`, en ajoutant un paramètre de **query string** nommé
`number` défini à la valeur en question :

```js
['one', 'two', 'three']
```

À chaque fois, convertissez le corps de réponse en `Number` et ajoutez-le à la
valeur précédente.

Faites un `console.log()` de la valeur accumulée.

## Conseils

Utilisez `async.reduce()` :

  https://github.com/caolan/async#reduce
