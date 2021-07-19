import { testFunction } from '../src/app';
import { assert } from 'chai';

describe('TEST: this is a test', function () {
  it('works', function () {
    assert.equal(testFunction(), 2);
  });
});
