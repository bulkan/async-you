# Défi

Écrivez un programme qui reçoit deux arguments de ligne de commande :
un nom d’hôte et un numéro de port.  Utilisez `http.request()` pour
envoyer une requête POST sur :

```js
url + '/users/create'
```

…avec un corps de requête contenant un objet « JSONifié » (`JSON.stringify()`) :

```js
{"user_id": 1}
```

Faites ça cinq fois, en incrémentant le `user_id` à chaque tour, en
commençant par 1.

Une fois que toutes les requêtes sont terminées, envoyez une requête GET à :

```js
url + '/users'
```

…et affichez le corps de réponse avec `console.log`.

## Conseils

Dans cet exercice, vous devez coordonner plusieurs opérations asynchrones.

Utilisez `async.series()` avec un objet de tâches.  L’une de ces tâches
devra utiliser `async.times()` pour envoyer les requêtes POST à l’aide
de `http.request()`.  L’autre fera juste une requête GET.

Vous trouverez davantage d’informations sur `async.times()` ici :

  https://github.com/caolan/async#times
