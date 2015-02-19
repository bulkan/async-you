var http          = require('http')
  , async         = require('async')
  , exercise      = require('workshopper-exercise')()
  , filecheck     = require('workshopper-exercise/filecheck')
  , execute       = require('workshopper-exercise/execute')
  , comparestdout = require('workshopper-exercise/comparestdout')


// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// compare stdout of solution and submission
exercise = comparestdout(exercise)


// set up the data file to be passed to the submission
exercise.addSetup(function (mode, callback) {
  // mode == 'run' || 'verify'

  var ports = [9345, 9346], servers = this.servers = [], users = [[], []],
    index = 0

  function startServer(serverUsers, serverCallback) {
    var count = 0
    var server = http.createServer(function (req, res) {
      handleRequests(req, res, serverUsers)
    }).listen(ports[index++], serverCallback)
    servers.push(server);
  }

  this.submissionArgs = [ "localhost", ports[0] ]
  this.solutionArgs   = [ "localhost", ports[1] ]

  async.each(users, startServer, callback)

  function handleRequests(req, res, users) {
    var body = "";
    if (req.method.toLowerCase() === 'post') {
      req.on('data', function(chunk){
        body += chunk.toString();
      });
      req.on('end', function(){
        users.push(JSON.parse(body));
        res.end();
      });
    } else {

      users.sort(function(a, b) { return a.user_id - b.user_id; });

      res.end(JSON.stringify({'users': users}));
    }
  }
})


// cleanup for both run and verify
exercise.addCleanup(function (mode, passed, callback) {
  // mode == 'run' || 'verify'

  if (!this.servers.length)
    return process.nextTick(callback)

  function closeServer(server, serverCallback) {
    server.close(serverCallback);
  }

  async.each(this.servers, closeServer, callback);
})


module.exports = exercise
