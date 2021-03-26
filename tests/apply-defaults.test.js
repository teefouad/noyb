import applyDefaults from '../src/apply-defaults';

describe('applyDefaults', () => {
  it('should return defaults for an empty object', () => {
    const obj = {};
    const defaults = { foo: 123 };
    const result = applyDefaults(obj, defaults);

    expect(result).toEqual(defaults);
  });

  it('should override default values', () => {
    const obj = { foo: 'baz' };
    const defaults = { foo: 123 };
    const result = applyDefaults(obj, defaults);

    expect(result.foo).toBe('baz');
  });

  it('should fill nested keys', () => {
    const obj = {
      data: {
        value: 100,
      },
    };
    const defaults = {
      foo: 123,
      data: {
        info: 'lorem',
        value: 1000,
      },
    };
    const result = applyDefaults(obj, defaults);

    expect(result.data.info).toBe('lorem');
    expect(result.data.value).toBe(100);
  });

  it('should keep keys that are not in the defaults object', () => {
    const obj = {
      foo: 123,
      data: {
        value: 100,
      },
    };
    const defaults = {
      data: {
        value: 1000,
      },
    };
    const result = applyDefaults(obj, defaults);

    expect(result.foo).toBe(123);
    expect(result.data.value).toBe(100);
  });
});
