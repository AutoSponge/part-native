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

`npm install --save-dev part-native`

Usage:

Get a reference to a bound function on a native object.

```js
var log = require( 'part-native' )( 'console' ).log;
[1,2,3].map( log );
```
or

```js
var map_ = require( 'Array.map_' );
var logAll = map_( log );
logAll( [1,2,3] );
```

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