// Dependencies
var Deffy = require("deffy");

/**
 * OneByOne
 * Calls functions one by one and memorizes the results.
 *
 * @name OneByOne
 * @function
 * @param {Array} arr An array of functions getting the callback parameter in the first argument.
 * @param {Function} cb The callback function called with:
 *
 *  - first parameter: `null` if there were no errors or an array containing the error values
 *  - `1 ... n` parameters: arrays containing the callback results
 *
 * @return {OneByOne} The `OneByOne` function.
 */
function OneByOne(arr, cb) {

    var result = []
      , cFunc = null
      , length = arr.length
      ;

    function doSeq(i) {
        cFunc = arr[i];
        if (typeof cFunc !== "function") {
            if (!Deffy(result[0], []).filter(Boolean).length) {
                result[0] = null;
            }
            // result: [[err1, err2], [data1, data2]]
            return cb.apply(null, result);
        }

        var _done = false;

        // Call the current function
        cFunc(function () {

            if (_done) { return; }
            _done = true;

            var args = [].slice.call(arguments)
              , cRes = null
              , ii = 0
              ;

            // Prepare the result data
            for (; ii < args.length; ++ii) {
                cRes = result[ii] = Deffy(result[ii], []);
                cRes[i] = args[ii];
            }

            doSeq(++i);
        });
    }

    doSeq(0);
}

module.exports = OneByOne;
