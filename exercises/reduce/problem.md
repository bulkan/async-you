Write a program that will receive an URL as the first command line argument.
To this URL send a GET request using {italic}http.get{/italic} with a query
parameter named {bold}number{/bold} which should be set consecutively to one
of the values in the following array

    ['one', 'two', 'three']

Convert the response body to a Number and add it to the previous value. 
console.log the reduced value.

{italic}TIPS:{/italic} use async.reduce
