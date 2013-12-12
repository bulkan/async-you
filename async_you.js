#!/usr/bin/env node

const workshopper = require('workshopper')
  , path = require('path');

workshopper({
  name: "async-you",
  title: "async you",
  subtitle: "Learn to use the async module in Node",
  appDir: __dirname,
  helpFile: path.join(__dirname, "help.txt")
}).init();
