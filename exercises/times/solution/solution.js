"use strict";
const { get, request } = require("http");
const async = require("async");
const { pipeline } = require("stream");
const concat = require("concat-stream");

async.series(
  {
    create: function (done) {
      async.times(
        5,
        function (n, next) {
          _addUser(++n, next);
        },
        function (err) {
          if (err) return done(err);
          done(null);
        }
      );
    },
    users: function (done) {
      const opts = {
        hostname: process.argv[2],
        port: process.argv[3],
        pathname: "/users",
      };
      get(opts, (res) => {
        res.setEncoding("utf-8");
        pipeline(
          res,
          concat((data) => {
            done(null, data);
          }),
          (err) => {
            if (err) return done(err);
          }
        );
      }).on("error", done);
    },
  },
  function (err, results) {
    if (err) return console.error(err);
    console.log(results.users);
  }
);

function _addUser(user_id, next) {
  const postData = JSON.stringify({ user_id });
  const opts = {
    hostname: process.argv[2],
    port: process.argv[3],
    pathname: "/users/create",
    method: "POST",
    headers: {
      "Content-Length": postData.length,
    },
  };
  const req = request(opts, (res) => {
    res
      .on("data", (chunk) => {})
      .on("end", () => {
        next(null, "created");
      })
      .on("error", next);
  }).on("error", next);
  req.write(postData);
  req.end();
}
