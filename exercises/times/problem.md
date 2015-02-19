Write a program that will receive two command line arguments containing
the hostname and port. Using `http.request` send a POST request to

    url + '/users/create'

with the body containing a JSON.stringify'ed object;

    {user_id : 1}

Do this five times with each of the `user_id` property being incremented starting
at 1.

Once these requests are done send a GET request to 

    url + '/users'

and console.log the response body for the GET request.

{italic}HINTS{/italic}: In this problem, you will need to co-ordinate a few async operations.

Use async.series for this and pass in an Object. One of the task functions will need to use async.times
to send POST requests using http.request. The other will then do the GET request.
