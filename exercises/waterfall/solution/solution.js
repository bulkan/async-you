"use  strict";
const { get } = require("http");
const async = require("async");
const concat = require("concat-stream");
const fs = require("fs");
const { pipeline } = require("stream");

async.waterfall(
  [
    function (done) {
      pipeline(
        fs.createReadStream(process.argv[2], "utf-8"),
        concat((data) => done(null, data)),
        (err) => {
          if (err) return done(err);
        }
      );
    },
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
  ],
  function (err, result) {
    if (err) return console.error(err);
    console.log(result);
  }
);
