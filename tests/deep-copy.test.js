import deepCopy from '../src/deep-copy';

describe('deepCopy', () => {
  it('should copy one level deep object', () => {
    const obj = { foo: 'FOO', baz: 'BAZ' };
    expect(deepCopy(obj)).toEqual(obj);
    expect(deepCopy(obj)).not.toBe(obj);
  });

  it('should copy two levels deep object', () => {
    const obj = {
      foo: 'FOO',
      baz: 'BAZ',
      fiz: {
        foo: 'FOO',
        baz: 'BAZ',
      },
    };
    expect(deepCopy(obj).fiz).toEqual(obj.fiz);
    expect(deepCopy(obj).fiz).not.toBe(obj.fiz);
  });

  it('should copy three levels deep object', () => {
    const obj = {
      foo: 'FOO',
      baz: 'BAZ',
      fiz: {
        foo: 'FOO',
        baz: 'BAZ',
        fae: {
          foo: 'FOO',
          baz: 'BAZ',
        },
      },
    };
    expect(deepCopy(obj).fiz.fae).toEqual(obj.fiz.fae);
    expect(deepCopy(obj).fiz.fae).not.toBe(obj.fiz.fae);
  });

  it('should copy an array', () => {
    const obj = ['foo', 'baz', 'fiz'];
    expect(deepCopy(obj)).toEqual(obj);
    expect(deepCopy(obj)).not.toBe(obj);
  });

  it('should copy an array of objects', () => {
    const obj = [
      'foo',
      'baz',
      {
        foo: 'FOO',
        baz: 'BAZ',
      },
    ];
    expect(deepCopy(obj[2])).toEqual(obj[2]);
    expect(deepCopy(obj[2])).not.toBe(obj[2]);
  });

  it('should copy an array of two levels deep objects', () => {
    const obj = [
      'foo',
      'baz',
      {
        foo: 'FOO',
        baz: 'BAZ',
        fiz: {
          foo: 'FOO',
          baz: 'BAZ',
        },
      },
    ];
    expect(deepCopy(obj[2].fiz)).toEqual(obj[2].fiz);
    expect(deepCopy(obj[2].fiz)).not.toBe(obj[2].fiz);
  });
});
