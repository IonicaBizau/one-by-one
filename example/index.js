var OneByOne = require("../lib");

OneByOne([
    function (cb) {
        setTimeout(function () {
            cb(null, "Waited 1000ms");
        }, 1000);
    }
  , function (cb) {
        setTimeout(function () {
            cb(new Error("Some error"));
        }, 100);
    }
  , function (cb) {
        cb(null, null);
    }
], function (err, data) {
    console.log(err, data);
});
