var assert = require('assert');
var util = require('../src/js/util.js');

describe('Util Tests', function () {
    describe('first', function () {
        it('should return the first number from the array', function () {
            var result = util.first([2, 3, 4]);
            assert.equal(2, result);
        });
    });

    describe('capitalize', function () {
        it('should convert first letter to uppercase', function () {
            var result = util.capitalize('foo');
            assert.equal('Foo', result);
        });

        it('should do nothing if first character is not a letter', function () {
            var result = util.capitalize('123foo');
            assert.equal('123foo', result);
        });
    });
});
