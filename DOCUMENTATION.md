## Documentation

You can see below the API reference of this module.

### `oneByOne(arr, cb)`
Calls functions one by one and memorizes the results.

#### Params

- **Array** `arr`: An array of functions getting the callback parameter in the first argument and response arguments from the previous function call.
- **Function** `cb`: The callback function called with an error (or `null`) and the results array.

#### Return
- **oneByOne** The `oneByOne` function.

