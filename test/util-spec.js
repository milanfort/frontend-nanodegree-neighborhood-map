var expect = require('chai').expect;
var util = require('../src/js/util.js');

describe('Util Tests', function () {

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
