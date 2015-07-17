var assert = require('assert');
var utility = require('../modules/utility');

describe('utility.js', function() {
  describe('#uniqNum', function () {
    it('should not produce a duplicate number', function () {
      var arr = [];
      for (var i = 1000; i > 0; i--) {
        var uniqNumber = utility.uniqNum();
        assert.equal(-1, arr.indexOf(uniqNumber));
        arr.push(uniqNumber);
      }
    });
  });

  describe('#normalizePort', function() {
    it('should return the supplied value when the value is not a number', function() {
      assert.equal('port', utility.normalizePort('port'));
      assert.equal(null, utility.normalizePort(null));
      var testArray = ['port', 'host'];
      var testObject = {port: 'port'};
      assert.equal(testArray, utility.normalizePort(testArray));
      assert.equal(testObject, utility.normalizePort(testObject));
    });
    it('should parse strings to int value', function() {
      assert.equal(3000, utility.normalizePort('3000'));
      assert.equal(0, utility.normalizePort('0'));
      assert.equal(4567, utility.normalizePort('4567'));
    });
    it('should return false when supplied with a negative number', function() {
      assert.equal(false, utility.normalizePort('-40'));
      assert.equal(false, utility.normalizePort(-3000));
    });
  });
});