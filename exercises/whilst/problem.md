Write a program that will receive a single command line argument to a URL.
Using {italic}async.whilst{/italic} and {italic}http.get{/italic} send GET
requests to this url until the response body contains the string {bold}meerkat{/bold}

console.log the amount of GET requests needed to retrieve the meerkat string

{italic}HINTS:{/italic} String.prototype.trim() is your friend.
