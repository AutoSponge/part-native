[![Build Status](https://travis-ci.org/AutoSponge/part-native.png?branch=master)](https://travis-ci.org/AutoSponge/part-native)
[![NPM version](https://badge.fury.io/js/part-native.svg)](http://badge.fury.io/js/part-native)

part-native
===========

generate helpful methods from native objects using [\_part\_](https://github.com/AutoSponge/_part_)

## Why?

- With one small lib, you can use `part` to safely expose all available methods of an object.  This
  can help make code more modular, functional, and maintainable.
- When passing functions as first-class objects, we often lose the method receiver (thisArg).  `part-native`
  methods are bound to their context or will allow you to curry the context.
- Array methods will work on ArrayLike objects (including Arguments objects) so your code will contain
  less type checking and slicing of arguments.
- By using `part-native` at startup, your application will have cached versions of the functions you need,
  immune to attempts to hack the native object prototypes.
- Turn your own simple prototypes into `part`-style method collections.

## Getting started

Installation:

`npm install --save part-native`

Or

download and include the script `lib/part-native.min.js`

Or

include the script from a CDN:

```html
<script src="https://cdn.rawgit.com/AutoSponge/part-native/master/lib/part-native.min.js"></script>
```

Usage:

Get a reference to a bound function on a native object.

```js
var log = require( 'part-native' )( 'console' ).log;
[1,2,3].map( log );
```
[try it](https://tonicdev.com/autosponge/part-native-console-log)

or

```js
var map_ = require( 'part-native' )( 'Array.map_' );
var logAll = map_( log );
logAll( [1,2,3] );
```

[try it](https://tonicdev.com/autosponge/part-native-array-reduce)

Get a reference to a collection of methods.

```js
var partArray = require( 'part-native' )( 'Array' );
var sum = partArray.reduce_( add );
```

or use your own objects

```js
function Klass( id ){
  this.id = id;
}
Klass.prototype.test = function ( msg ) {
  console.log( msg + this.id );
};
var partKlass = require( 'part-native' )( 'Klass', Klass );
var klassMsg = partKlass.test_( 'hi from ' );
klassMsg( new Klass( 1 ) );
```

[try it](https://tonicdev.com/autosponge/part-native-custom-method)

If you're using `part-native` in the browser, use the global method `createPart`:

```js
var map_ = createPart( 'Array.map_' );
var add1 = function (n) {return n + 1;}
var incAll = map_( add1 );
incAll( [1,2,3] ) // -> [2,3,4]
```