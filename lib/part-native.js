(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.createPart = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var part = require( 'part' );

var cache = {};

/**
 * @param {String} name
 * @param {Object} [obj]
 * @returns {Object}
 */
module.exports = function ( name, obj ) {
    'use strict';
    var split = name.split( '.' );
    var objectName = split[0];
    var methodName = split[1];
    var o = obj || global[objectName];
    if ( o && !cache[objectName] ) {
        cache[objectName] = {};
        if ( o.prototype ) {
            // collect prototype methods
            // create _part and part_ versions of each
            Object.getOwnPropertyNames( o.prototype )
                .filter( function ( method ) {
                try {
                    return method !== 'constructor' &&
                        method !== 'prototype' &&
                        typeof o.prototype[method] === 'function';
                } catch ( e ) {
                    return false;
                }
            } ).forEach( part._borrow( cache[objectName], o.prototype ) );
        }

        // collect static methods
        // bind them to the named object
        Object.getOwnPropertyNames( o )
            .filter( function ( method ) {
            try {
                return method !== 'constructor' &&
                    method !== 'prototype' &&
                    typeof o[method] === 'function';
            } catch ( e ) {
                return false;
            }
        } ).forEach( function ( method ) {
                cache[objectName][method] = part._create( o[method] )( o );
        } );
    }
    return methodName ? cache[objectName][methodName] : cache[objectName];
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"part":2}],2:[function(require,module,exports){
var $__toObject = function(value) {
  if (value == null) throw TypeError();
  return Object(value);
}, $__spread = function() {
  var rv = [], k = 0;
  for (var i = 0; i < arguments.length; i++) {
    var value = $__toObject(arguments[i]);
    for (var j = 0; j < value.length; j++) {
      rv[k++] = value[j];
    }
  }
  return rv;
};
(function(GLOBAL, $) {
  $.papply = function(fn, receiver) {
    return function part__() {
      for (var args1 = [], $__0 = 0; $__0 < arguments.length; $__0++) args1[$__0] = arguments[$__0];
      return function part_() {
        for (var args2 = [], $__1 = 0; $__1 < arguments.length; $__1++) args2[$__1] = arguments[$__1];
        return fn.apply(receiver, $__spread(args1, args2));
      };
    };
  };
  $._create = function(fn) {
    return function _part(receiver) {
      for (var args1 = [], $__1 = 1; $__1 < arguments.length; $__1++) args1[$__1 - 1] = arguments[$__1];
      return function part_() {
        for (var args2 = [], $__0 = 0; $__0 < arguments.length; $__0++) args2[$__0] = arguments[$__0];
        return fn.apply(receiver, $__spread(args1, args2));
      };
    };
  };
  $.create_ = function(fn) {
    return function part_() {
      for (var args1 = [], $__0 = 0; $__0 < arguments.length; $__0++) args1[$__0] = arguments[$__0];
      return function _part(receiver) {
        for (var args2 = [], $__1 = 1; $__1 < arguments.length; $__1++) args2[$__1 - 1] = arguments[$__1];
        return fn.apply(receiver, $__spread(args1, args2));
      };
    };
  };
  $.augment = function(name, fn) {
    this["_" + name] = $._create(fn);
    this[name + "_"] = $.create_(fn);
  };
  $.borrow = function(source, name) {
    $.augment.call(this, name, source[name]);
  };
  $.augment("augment", $.augment);
  $.augment("borrow", $.borrow);
  if (typeof module === "undefined") {
    GLOBAL._part_ = $;
  } else {
    module.exports = $;
  }
}(this, {}));

},{}]},{},[1])(1)
});