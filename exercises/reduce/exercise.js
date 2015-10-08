var http          = require('http')
  , url           = require('url')
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

  var numbers = {'one': 1, 'two': 2, 'three': 3}

  this.server = http.createServer(function (req, res) {
    var number = url.parse(req.url, true).query.number
    res.end((numbers[number]).toString())
  })

  this.server.listen(9345, callback)

  var args = [ 'http://localhost:9345' ]
  this.submissionArgs = args
  this.solutionArgs   = args
})


// cleanup for both run and verify
exercise.addCleanup(function (mode, passed, callback) {
  // mode == 'run' || 'verify'

  if (!this.server)
    return process.nextTick(callback)

  this.server.close(callback)
})


module.exports = exercise
