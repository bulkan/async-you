"use strict";
const { get } = require("http");
const async = require("async");

async.each(
  process.argv.slice(2),
  function (url, done) {
    get(url, (res) => {
      res
        .on("data", (chunk) => {})
        .on("end", () => done(null))
        .on("error", done);
    }).on("error", done);
  },
  function (err) {
    if (err) console.error(err);
  }
);
