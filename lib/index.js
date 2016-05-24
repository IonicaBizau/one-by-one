"use strict";

const objDef = require("obj-def")
    , sliced = require("sliced")
    ;

/**
 * oneByOne
 * Calls functions one by one and memorizes the results.
 *
 * @name oneByOne
 * @function
 * @param {Array} arr An array of functions getting the callback parameter in
 * the first argument and response arguments from the previous function call.
 * @param {Function} cb The callback function called with an error (or `null`)
 * and the results array.
 * @return {oneByOne} The `oneByOne` function.
 */
module.exports = function oneByOne(arr, cb) {

    let self = this
      , result = [null]
      , lastRes = []
      ;

    // This is called when everything is done
    let done = () => {
        // result: [null|Error, [data1, data2], ...args]
        cb && cb.apply(self, result.concat(lastRes));
    };


    // This make sure that the functions are executed one by one
    let doSeq = i => {

        // We are done
        if (i === arr.length) {
            return done();
        }

        let cFunc = arr[i];
        if (typeof cFunc !== "function") {
            return doSeq(++i);
        }

        // Call the current function
        cFunc.apply(self, [function () {

            let args = sliced(arguments);

            // Prepare the result data
            for (let ii = 1; ii < args.length; ++ii) {
                let cRes = objDef(result, ii, []);
                cRes[i] = args[ii];
            }

            // We found an error
            if (args[0]) {
                result[0] = args[0];
                return done();
            }

            lastRes = sliced(args, 1);

            doSeq(++i);
        }].concat(lastRes));
    };

    doSeq(0);
};
