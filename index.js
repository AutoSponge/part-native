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