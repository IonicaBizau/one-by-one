
# one-by-one

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/one-by-one.svg)](https://www.npmjs.com/package/one-by-one) [![Downloads](https://img.shields.io/npm/dt/one-by-one.svg)](https://www.npmjs.com/package/one-by-one) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

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
    Math.random() > 0.5 ? next => {
        console.log("Generated a random number greater than 0.5.");
        next();
    } : null
  , cb => setTimeout(
        () => cb(null, "Hello World")
      , 1000
    )
  , (cb, prev) => setTimeout(
        () => cb(null, prev.replace("World", "Mars"))
      , 1000
    )
], (err, data, message) => {
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


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
