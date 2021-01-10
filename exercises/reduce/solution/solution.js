"use strict";
const { get } = require("http");
const async = require("async");
const { pipeline } = require("stream");
const concat = require("concat-stream");

async.reduce(
  ["one", "two", "three"],
  0,
  function (memo, item, done) {
    get(process.argv[2] + "?number=" + item, (res) => {
      res.setEncoding("utf-8");
      pipeline(
        res,
        concat((data) => {
          done(null, Number(data) + memo);
        }),
        (err) => {
          if (err) return done(err);
        }
      );
    }).on("error", done);
  },
  function (err, result) {
    if (err) return console.error(err);
    console.log(result);
  }
);
