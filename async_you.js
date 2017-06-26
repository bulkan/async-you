#!/usr/bin/env node

const workshopper = require('workshopper-adventure');
const path = require('path');

const workshop = workshopper({
  name: "async-you",
  appDir: __dirname,
  languages: ['en', 'fr', 'ru'],
  helpFile: path.join(__dirname, "./i18n/help/{lang}.txt"),
  header: require('workshopper-adventure/default/header'),
  footer: require('workshopper-adventure/default/footer')
});

workshop.addAll(require('./exercises/menu.json'));
workshop.execute(process.argv.slice(2));