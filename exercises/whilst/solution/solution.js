"use strict";
const { get } = require("http");
const async = require("async");

let requestBody = "";
let count = 0;

async.whilst(
  function (cb) {
    cb(null, !/meerkat/.test(requestBody.trim()));
  },

  function (done) {
    let body = "";
    get(process.argv[2], (res) => {
      res
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", () => {
          ++count;
          requestBody = body;
          done();
        });
    }).on("error", done);
  },

  function (err) {
    if (err) return console.error(err);
    console.log(count);
  }
);

