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

    describe('uriEncodeCoords', function () {
        it('should properly encode coordinates as string', function () {
            var coords = {
                lat: 52.5163,
                lng: 13.3777
            };

            var result = util.uriEncodeCoords(coords);
            expect(result).to.equal('52.5163%7C13.3777');
        });
    });
});
