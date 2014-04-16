part-native
===========

generate helpful methods from native objects using [\_part\_](https://github.com/AutoSponge/_part_)

## Why?

- With one small lib, you can use `part` to safely expose all available methods of an object.  This
  can help make code more modular, functional, and maintainable.
- When passing functions as first-class objects, we often lose the method receiver (thisArg).  `part-native`
  methods are bound to their context or will allow you to curry the context.

## Getting started

Installation:

`npm install --save-dev part-native`

Usage:

Get a reference to a bound function on a native object.

```js
var log = require( 'part-native' )( 'console' ).log;
[1,2,3].map( log );
```

Get a