import getType from '../src/get-type';

describe('getType', () => {
  it('should return "object" for an object', () => {
    const obj = {};
    const expected = 'object';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "function" for a function', () => {
    const obj = function foo() { };
    const expected = 'function';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "function" for an arrow function', () => {
    const obj = () => { };
    const expected = 'function';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "generatorfunction" for a generator function', () => {
    const obj = function* generator() { yield null; };
    const expected = 'generatorfunction';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "boolean" for a boolean', () => {
    const obj = true;
    const expected = 'boolean';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "string" for a string', () => {
    const obj = 'foo';
    const expected = 'string';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "number" for a number', () => {
    const obj = 10;
    const expected = 'number';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "undefined" for undefined', () => {
    const obj = undefined;
    const expected = 'undefined';

    expect(getType(obj)).toEqual(expected);
  });

  it('should return "object" for null', () => {
    const obj = null;
    const expected = 'null';

    expect(getType(obj)).toEqual(expected);
  });
});
