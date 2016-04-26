
# one-by-one [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/one-by-one.svg)](https://www.npmjs.com/package/one-by-one) [![Downloads](https://img.shields.io/npm/dt/one-by-one.svg)](https://www.npmjs.com/package/one-by-one) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Run async tasks one by one.

If you want to run async functions in parallel, check out [`same-time`](https://github.com/IonicaBizau/same-time).

## :cloud: Installation

```sh
$ npm i --save one-by-one
```


## :clipboard: Example



```js
const oneByOne = require("one-by-one");

// Call these functions one by one
oneByOne([
    cb => {
        setTimeout(function () {
            cb(null, "Hello World");
        }, 1000);
    }
  , (cb, data) => {
        console.log(data);
        // => "Hello World"
        setTimeout(function () {
            cb(new Error("Some error"));
        }, 100);
    }
  , cb => {
        // This will NOT be triggered because the
        // previous sent an error
        cb(null, null);
    }
], (err, data) => {
    console.log(err, data);
    // => [Error: Some error] [ 'Hello World' ]
});

// Call these functions one by one
oneByOne([
    function (cb) {
        setTimeout(function () {
            cb(null, "Hello World");
        }, 1000);
    }
  , function (cb, prev) {
        setTimeout(function () {
            cb(null, prev.replace("World", "Mars"));
        }, 1000);
    }
], function (err, data, message) {
    console.log(err, data, message);
    // null [ 'Hello World', 'Hello Mars' ] 'Hello Mars'
});
```

## :memo: Documentation


### `oneByOne(arr, cb)`
Calls functions one by one and memorizes the results.

#### Params
- **Array** `arr`: An array of functions getting the callback parameter in the first argument and response arguments from the previous function call.
- **Function** `cb`: The callback function called with an error (or `null`) and the results array.

#### Return
- **oneByOne** The `oneByOne` function.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`blah`](https://github.com/IonicaBizau/blah)—A command line tool to optimize the repetitive actions.
 - [`cdnjs-importer`](https://github.com/cdnjs/cdnjs-importer)—Easy way to import a library into CDNJS.
 - [`cobol`](https://github.com/IonicaBizau/node-cobol)—COBOL bridge for NodeJS which allows you to run COBOL code from NodeJS.
 - [`engine-tools`](https://github.com/jillix/engine-tools) (by jillix)—Engine Tools library and CLI app.
 - [`gif-cli`](https://github.com/IonicaBizau/gif-cli)—Gif animations in your terminal!
 - [`git-package-json`](https://github.com/IonicaBizau/git-package-json#readme)—Get the package.json contents from git repositories.
 - [`git-stats-importer`](https://github.com/IonicaBizau/git-stats-importer)—Imports your commits from a repository into git-stats history.
 - [`gpm`](https://github.com/IonicaBizau/gpm)—npm + git = gpm - Install NPM packages and dependencies from git repositories.
 - [`gry`](https://github.com/IonicaBizau/node-gry)—A minimalist NodeJS wrapper for the `git` commands. `gry` stands for the Git RepositorY.
 - [`image-to-ascii`](https://github.com/IonicaBizau/image-to-ascii)—A Node.JS module that converts images to ASCII art.
 - [`nodeice`](https://github.com/IonicaBizau/nodeice)—Another PDF invoice generator
 - [`np-init`](https://github.com/IonicaBizau/np-init#readme)—Easily start a npm package from scratch.
 - [`ssh-remote`](https://github.com/IonicaBizau/ssh-remote)—Automagically switch on the SSH remote url in a Git repository.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
