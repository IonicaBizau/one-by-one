# one-by-one [![Support this project][donate-now]][paypal-donations]

Run async tasks one by one.

If you want to run async functions in parallel, check out [`same-time`](https://github.com/IonicaBizau/same-time.js).

## Installation

```sh
$ npm i one-by-one
```

## Example

```js
// Dependencies
var OneByOne = require("one-by-one");

// Call these functions one by one
OneByOne([
    function (cb) {
        setTimeout(function () {
            cb(null, "Hello World");
        }, 1000);
    }
  , function (cb, data) {
        console.log(data);
        // => "Hello World"
        setTimeout(function () {
            cb(new Error("Some error"));
        }, 100);
    }
  , function (cb) {
        // This will NOT be triggered because the
        // previous sent an error
        cb(null, null);
    }
], function (err, data) {
    console.log(err, data);
});
```

## Documentation

### `OneByOne(arr, cb)`
Calls functions one by one and memorizes the results.

#### Params
- **Array** `arr`: An array of functions getting the callback parameter in the first argument and response arguments from the previous function call.
- **Function** `cb`: The callback function called with an error (or `null`) and the results array.

#### Return
- **OneByOne** The `OneByOne` function.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`blah`](https://github.com/IonicaBizau/blah)

 - [`cdnjs-importer`](https://github.com/cdnjs/cdnjs-importer)

 - [`cobol`](https://github.com/IonicaBizau/node-cobol)

 - [`engine-tools`](https://github.com/jillix/engine-tools) by jillix

 - [`gif-cli`](https://github.com/IonicaBizau/gif-cli)

 - [`git-stats-importer`](https://github.com/IonicaBizau/git-stats-importer)

 - [`gpm`](https://github.com/IonicaBizau/node-gpm)

 - [`gry`](https://github.com/IonicaBizau/node-gry)

 - [`ssh-remote`](https://github.com/IonicaBizau/ssh-remote)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md