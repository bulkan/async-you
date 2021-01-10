"use strict";
const { get } = require("http");
const async = require("async");
const concat = require("concat-stream");
const { pipeline } = require("stream");

async.map(
  process.argv.slice(2),
  function (url, done) {
    get(url, (res) => {
      res.setEncoding("utf-8");
      pipeline(
        res,
        concat((data) => done(null, data)),
        (err) => {
          if (err) return done(err);
        }
      );
    }).on("error", done);
  },
  (err, results) => {
    if (err) console.error(err);
    console.log(results);
  }
);
