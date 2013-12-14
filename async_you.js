#!/usr/bin/env node

const workshopper = require('workshopper')
  , path = require('path');

workshopper({
  name: "async-you",
  title: "async you - learn to use the async package",
  appDir: __dirname,
  helpFile: path.join(__dirname, "help.txt")
}).init();
