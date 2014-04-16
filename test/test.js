var test = require( 'tape' );
var native = require( '../' );

test( 'native global', function ( t ) {
    t.plan( 3 );

    var functionNatives = native( 'Function' );
    var consoleNatives = native( 'console' );

    t.ok( Object.keys( functionNatives ).indexOf( 'bind_' ) > -1 );
    t.ok( Object.keys( functionNatives ).indexOf( '_bind' ) > -1 );

    t.ok( Object.keys( consoleNatives ).indexOf( 'log' ) > -1 );

} );

test( 'native global.method', function ( t ) {
    t.plan( 1 );

    var map_ = native( 'Array.map_' );
    var stringify = native( 'JSON.stringify' );

    t.deepEqual( map_( stringify )( [{0:1}] ), ['{"0":1}'] );

} );

test( 'fn', function ( t ) {
    t.plan( 2 );

    function Klass(){}
    Klass.prototype.test = function () {};

    t.ok( Object.keys( native( 'Klass', Klass ) ).indexOf( 'test_' ) > -1 );
    t.ok( typeof native( 'Klass._test', Klass ) === 'function' );
} );

test( 'obj', function ( t ) {
    t.plan( 2 );

    var obj = {
        uniq: [],
        test: function () {
            return this.uniq;
        }
    };

    var test = native( 'obj.test', obj );
    t.ok( typeof test === 'function' );
    t.equal( test(), obj.test() );
} );