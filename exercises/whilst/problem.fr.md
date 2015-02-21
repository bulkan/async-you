## Défi

Écrivez un programme qui reçoit une URL en argument de ligne de commande.

Utilisez `async.whilst()` et `http.get()` pour envoyer des requêtes GET à
cette URL jusqu’à ce que le corps de réponse contienne `"meerkat"`.

Faites un `console.log()` du nombre de requêtes GET qu’il vous aura fallu pour
obtenir le texte "meerkat".

## Conseils

`String.prototype.trim()` est votre ami.

Vous trouverez la documentation de `async.whilst()` ici :

  https://github.com/caolan/async#whilst
