import { assert } from 'chai';
import { forEach, isEmptyString } from '../common';
import { spy } from 'sinon';

describe('forEach test suite', () => {
  const obj = {
    1: 1,
    2: 2,
    3: 3,
  };
  const callback = spy();
  it('should return without calling callback for undefined objects', () => {
    forEach(undefined, callback);
    assert.equal(callback.callCount, 0);
    assert.equal(callback.callCount, 0);
  });
  it('should call forEach for each defined key in an object', () => {
    forEach(obj, callback);
    assert.equal(callback.callCount, 3);
    assert.equal(callback.callCount, 3);
  });
});

describe('isEmptyString test suite', () => {
  it('should return true if its 0 length string', () => {
    assert.isTrue(isEmptyString(''));
  });
  it('should return false if the string has some content', () => {
    assert.isNotTrue(isEmptyString('abc'));
  });
});
