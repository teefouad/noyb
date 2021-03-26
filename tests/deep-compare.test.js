import deepCompare from '../src/deep-compare';

describe('deepCompare', () => {
  it('should match empty objects', () => {
    const objA = {};
    const objB = {};
    expect(deepCompare(objA, objB)).toBe(true);
  });

  it('should match filled objects', () => {
    const objA = { name: 'foo' };
    const objB = { name: 'foo' };
    expect(deepCompare(objA, objB)).toBe(true);
  });

  it('should not match different objects', () => {
    const objA = { name: 'foo' };
    const objB = { name: 'baz' };
    expect(deepCompare(objA, objB)).toBe(false);
  });

  it('should not match different types', () => {
    const objA = {};
    const objB = [];
    expect(deepCompare(objA, objB)).toBe(false);
  });

  it('should match empty arrays', () => {
    const objA = [];
    const objB = [];
    expect(deepCompare(objA, objB)).toBe(true);
  });

  it('should match filled arrays', () => {
    const objA = [1, { age: 10 }, 'foo'];
    const objB = [1, { age: 10 }, 'foo'];
    expect(deepCompare(objA, objB)).toBe(true);
  });

  it('should not match different arrays', () => {
    const objA = [1, { age: 10 }, 'foo'];
    const objB = [1, { age: 20 }, 'foo'];
    expect(deepCompare(objA, objB)).toBe(false);
  });
});
