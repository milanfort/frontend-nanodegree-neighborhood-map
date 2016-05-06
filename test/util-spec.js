var expect = require('chai').expect;
var util = require('../src/js/util.js');

describe('Util Tests', function () {
    describe('first', function () {
        it('should return the first number from the array', function () {
            var result = util.first([2, 3, 4]);
            expect(result).to.equal(2);
        });
    });

    describe('capitalize', function () {
        it('should convert first letter to uppercase', function () {
            var result = util.capitalize('foo');
            expect(result).to.equal('Foo');
        });

        it('should do nothing if first character is not a letter', function () {
            var result = util.capitalize('123foo');
            expect(result).to.equal('123foo');
        });
    });

    describe('contains', function () {
        it('should return true if first string contains the second string', function () {
            var result = util.contains('foobar', 'foo');
            expect(result).to.equal(true);
        });

        it('should return false if first string does not contain the second string', function () {
            var result = util.contains('foobar', 'aaa');
            expect(result).to.equal(false);
        });

        it('should return true if second string is empty', function () {
            var result = util.contains('foobar', '');
            expect(result).to.equal(true);
        });

        it('should return true if second string contains only spaces', function () {
            var result = util.contains('foobar', '   ');
            expect(result).to.equal(true);
        });

        it('should return true if first string contains the second string, even if case differs', function () {
            var result = util.contains('foobar', 'FOO');
            expect(result).to.equal(true);
        });
    });
});
