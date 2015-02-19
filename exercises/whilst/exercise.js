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

  var max = Math.min(2, Math.floor(Math.random() * 5) + 1)

  var ports = [9345, 9346], servers = this.servers = []

  function startServer(port, serverCallback) {
    var count = 0
    var server = http.createServer(function (req, res) {
      if (count >= max) {
        res.end('meerkat')
      } else {
        ++count;
        res.end()
      }
    }).listen(port, serverCallback);
    servers.push(server);
  }

  this.submissionArgs = [ "http://localhost:" + ports[0] ]
  this.solutionArgs   = [ "http://localhost:" + ports[1] ]

  async.each(ports, startServer, callback)
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
