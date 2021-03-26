import mergeObjects from '../src/merge-objects';

describe('mergeObjects', () => {
  it('should merge top level keys', () => {
    const objA = { foo: 'hello' };
    const objB = { foo: 'world' };
    const result = mergeObjects(objA, objB);
    expect(result.foo).toBe('world');
  });

  it('should merge deep keys', () => {
    const objA = { foo: { data: { value: 10, label: 'foo' } } };
    const objB = { 'foo.data.label': 'baz' };
    const result = mergeObjects(objA, objB);
    expect(result.foo.data.value).toBe(10);
    expect(result.foo.data.label).toBe('baz');
  });
});
