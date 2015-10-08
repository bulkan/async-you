#!/usr/bin/env node

const workshopper = require('workshopper')
  , path = require('path');

workshopper({
  name: "async-you",
  appDir: __dirname,
  languages: ['en', 'fr'],
  helpFile: path.join(__dirname, "./i18n/help/{lang}.txt")
});
