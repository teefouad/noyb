import queryObject, { findPropInObject } from '../src/query-object';

describe('queryObject', () => {
  it('should read: empty string', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = '';
    const expected = undefined;

    expect(queryObject(path, obj)).toBe(expected);
  });

  it('should read: * where * is an object', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = '*';
    const expected = [
      'baz',
      'buzz',
      'beez',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: * where * is an object', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '*';
    const expected = [
      'baz',
      'buzz',
      'beez',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = 'foo';
    const expected = 'baz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.baz', () => {
    const obj = {
      foo: {
        baz: 'fiz',
      },
    };
    const path = 'foo.baz';
    const expected = 'fiz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.baz.fizz', () => {
    const obj = {
      foo: {
        baz: {
          fizz: 'buzz',
        },
      },
    };
    const path = 'foo.baz.fizz';
    const expected = 'buzz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: [0]', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '[0]';
    const expected = 'baz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: [0][1]', () => {
    const obj = [
      ['baz', 'buzz', 'beez'],
    ];
    const path = '[0][1]';
    const expected = 'buzz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo[0]', () => {
    const obj = {
      foo: ['baz', 'buzz', 'beez'],
    };
    const path = 'foo[0]';
    const expected = 'baz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: [1].fiz', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: 'buzz' },
    ];
    const path = '[1].fiz';
    const expected = 'buzz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: [1].fiz[0]', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: ['baz', 'buzz', 'beez'] },
    ];
    const path = '[1].fiz[0]';
    const expected = 'baz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: [1].fiz[0][1]', () => {
    const obj = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 'buzz', 'beez'],
        ],
      },
    ];
    const path = '[1].fiz[0][1]';
    const expected = 'buzz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo[0].fiz', () => {
    const obj = {
      foo: [
        { fiz: 'buzz' },
      ],
    };
    const path = 'foo[0].fiz';
    const expected = 'buzz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.fizz[0].fiz[1][2].value', () => {
    const obj = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                { value: 'buzz' },
              ],
            ],
          },
        ],
      },
    };
    const path = 'foo.fizz[0].fiz[1][2].value';
    const expected = 'buzz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.*', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = 'foo.*';
    const expected = 'baz';

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.* where * is an object', () => {
    const obj = {
      foo: {
        a: { foo: 'baz' },
        b: { foo: 'buzz' },
        c: { foo: 'boo' },
      },
    };
    const path = 'foo.*';
    const expected = [
      { foo: 'baz' },
      { foo: 'buzz' },
      { foo: 'boo' },
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.* where * is an array', () => {
    const obj = {
      foo: [
        'baz',
        'buzz',
        'beez',
      ],
    };
    const path = 'foo.*';
    const expected = [
      'baz',
      'buzz',
      'beez',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: *.foo where * is an object', () => {
    const obj = {
      a: { foo: 'baz' },
      b: { foo: 'buzz' },
      c: { foo: 'boo' },
    };
    const path = '*.foo';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: *.foo where * is an array', () => {
    const obj = [
      { foo: 'baz' },
      { foo: 'buzz' },
      { foo: 'boo' },
    ];
    const path = '*.foo';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.*.fiz where * is an object', () => {
    const obj = {
      foo: {
        a: { fiz: 'baz' },
        b: { fiz: 'buzz' },
        c: { fiz: 'boo' },
      },
    };
    const path = 'foo.*.fiz';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo.*.baz where * is an array', () => {
    const obj = {
      foo: [
        { fiz: 'baz' },
        { fiz: 'buzz' },
        { fiz: 'boo' },
      ],
    };
    const path = 'foo.*.fiz';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo[0].fiz.* where * is an object', () => {
    const obj = {
      foo: [
        {
          fiz: {
            a: { foo: 'baz' },
            b: { foo: 'buzz' },
            c: { foo: 'boo' },
          },
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const expected = [
      { foo: 'baz' },
      { foo: 'buzz' },
      { foo: 'boo' },
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo[0].fiz.* where * is an array', () => {
    const obj = {
      foo: [
        {
          fiz: [
            'baz',
            'buzz',
            'boo',
          ],
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: fizz.*[0] where * is an object', () => {
    const obj = {
      fizz: {
        a: ['baz'],
        b: ['buzz'],
        c: ['boo'],
      },
    };
    const path = 'fizz.*[0]';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: fizz.*[0] where * is an array', () => {
    const obj = {
      fizz: [
        ['baz'],
        ['buzz'],
        ['boo'],
      ],
    };
    const path = 'fizz.*[0]';
    const expected = [
      'baz',
      'buzz',
      'boo',
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: foo[0].*.fiz.*.* where * is an object', () => {
    const obj = {
      foo: [
        {
          a: {
            fiz: [
              ['a', 'b'],
              ['c', 'd'],
            ],
          },
          b: {
            fiz: [
              ['a', 'b'],
              ['c', 'd'],
            ],
          },
          c: {
            fiz: [
              ['a', 'b'],
              ['c', 'd'],
            ],
          },
        },
      ],
    };
    const path = 'foo[0].*.fiz.*.*';
    const expected = [
      [
        ['a', 'b'],
        ['c', 'd'],
      ],
      [
        ['a', 'b'],
        ['c', 'd'],
      ],
      [
        ['a', 'b'],
        ['c', 'd'],
      ],
    ];

    expect(queryObject(path, obj)).toEqual(expected);
  });

  it('should read: no existing key', () => {
    const obj = {};
    const path = 'foo.fiz.fuzz';
    const expected = undefined;

    expect(queryObject(path, obj)).toBe(expected);
  });


  it('should write: empty string', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = '';
    const expected = { ...obj };

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: * where * is an object', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = '*';
    const expected = {
      foo: 'boo',
      fiz: 'boo',
      fae: 'boo',
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: * where * is an array', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '*';
    const expected = [
      'boo',
      'boo',
      'boo',
    ];

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = 'foo';
    const expected = {
      foo: 'boo',
      fiz: 'buzz',
      fae: 'beez',
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo.baz', () => {
    const obj = {
      foo: {
        baz: 'fiz',
      },
    };
    const path = 'foo.baz';
    const expected = {
      foo: {
        baz: 'boo',
      },
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo.baz.fizz', () => {
    const obj = {
      foo: {
        baz: {
          fizz: 'buzz',
        },
      },
    };
    const path = 'foo.baz.fizz';
    const expected = {
      foo: {
        baz: {
          fizz: 'boo',
        },
      },
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: [0]', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '[0]';
    const expected = [
      'boo',
      'buzz',
      'beez',
    ];

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: [0][1]', () => {
    const obj = [
      ['baz', 'buzz', 'beez'],
    ];
    const path = '[0][1]';
    const expected = [
      ['baz', 'boo', 'beez'],
    ];

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo[0]', () => {
    const obj = {
      foo: ['baz', 'buzz', 'beez'],
    };
    const path = 'foo[0]';
    const expected = {
      foo: ['boo', 'buzz', 'beez'],
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: [1].fiz', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: 'buzz' },
    ];
    const path = '[1].fiz';
    const expected = [
      { foo: 'baz' },
      { fiz: 'boo' },
    ];

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: [1].fiz[0]', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: ['baz', 'buzz', 'beez'] },
    ];
    const path = '[1].fiz[0]';
    const expected = [
      { foo: 'baz' },
      { fiz: ['boo', 'buzz', 'beez'] },
    ];

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: [1].fiz[0][1]', () => {
    const obj = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 'buzz', 'beez'],
        ],
      },
    ];
    const path = '[1].fiz[0][1]';
    const expected = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 'boo', 'beez'],
        ],
      },
    ];

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo[0].fiz', () => {
    const obj = {
      foo: [
        { fiz: 'buzz' },
      ],
    };
    const path = 'foo[0].fiz';
    const expected = {
      foo: [
        { fiz: 'boo' },
      ],
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo.fizz[0].fiz[1][2].value', () => {
    const obj = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                { value: 'buzz' },
              ],
            ],
          },
        ],
      },
    };
    const path = 'foo.fizz[0].fiz[1][2].value';
    const expected = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                { value: 'boo' },
              ],
            ],
          },
        ],
      },
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo.* where * is an object', () => {
    const obj = {
      foo: {
        foo: 'baz',
        fiz: 'buzz',
        fae: 'beez',
      },
    };
    const path = 'foo.*';
    const expected = {
      foo: {
        foo: 'boo',
        fiz: 'boo',
        fae: 'boo',
      },
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: foo.* where * is an array', () => {
    const obj = {
      foo: [
        'baz',
        'buzz',
        'beez',
      ],
    };
    const path = 'foo.*';
    const expected = {
      foo: [
        'boo',
        'boo',
        'boo',
      ],
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should write: *.foo where * is an object', () => {
    const obj = {
      a: { foo: 'baz' },
      b: { foo: 'buzz' },
      c: { foo: 'boo' },
    };
    const path = '*.foo';
    const expected = {
      a: { foo: 'baz' },
      b: { foo: 'baz' },
      c: { foo: 'baz' },
    };

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: *.foo where * is an array', () => {
    const obj = [
      { foo: 'baz' },
      { foo: 'buzz' },
      { foo: 'boo' },
    ];
    const path = '*.foo';
    const expected = [
      { foo: 'baz' },
      { foo: 'baz' },
      { foo: 'baz' },
    ];

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: foo.*.fiz where * is an object', () => {
    const obj = {
      foo: {
        a: { fiz: 'baz' },
        b: { fiz: 'buzz' },
        c: { fiz: 'boo' },
      },
    };
    const path = 'foo.*.fiz';
    const expected = {
      foo: {
        a: { fiz: 'baz' },
        b: { fiz: 'baz' },
        c: { fiz: 'baz' },
      },
    };

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: foo.*.baz where * is an array', () => {
    const obj = {
      foo: [
        { fiz: 'baz' },
        { fiz: 'buzz' },
        { fiz: 'boo' },
      ],
    };
    const path = 'foo.*.fiz';
    const expected = {
      foo: [
        { fiz: 'baz' },
        { fiz: 'baz' },
        { fiz: 'baz' },
      ],
    };

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: foo[0].fiz.* where * is an object', () => {
    const obj = {
      foo: [
        {
          fiz: {
            a: { foo: 'baz' },
            b: { foo: 'buzz' },
            c: { foo: 'boo' },
          },
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const expected = {
      foo: [
        {
          fiz: {
            a: 'baz',
            b: 'baz',
            c: 'baz',
          },
        },
      ],
    };

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: foo[0].fiz.* where * is an array', () => {
    const obj = {
      foo: [
        {
          fiz: [
            'baz',
            'buzz',
            'boo',
          ],
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const expected = {
      foo: [
        {
          fiz: [
            'baz',
            'baz',
            'baz',
          ],
        },
      ],
    };

    expect(queryObject(path, obj, 'baz')).toEqual(expected);
  });

  it('should write: fizz.*[0] where * is an object', () => {
    const obj = {
      fizz: {
        a: ['baz'],
        b: ['buzz'],
        c: ['boo'],
      },
    };
    const path = 'fizz.*[0]';
    const expected = {
      fizz: {
        a: ['foo'],
        b: ['foo'],
        c: ['foo'],
      },
    };

    expect(queryObject(path, obj, 'foo')).toEqual(expected);
  });

  it('should write: fizz.*[0] where * is an array', () => {
    const obj = {
      fizz: [
        ['baz'],
        ['buzz'],
        ['boo'],
      ],
    };
    const path = 'fizz.*[0]';
    const expected = {
      fizz: [
        ['foo'],
        ['foo'],
        ['foo'],
      ],
    };

    expect(queryObject(path, obj, 'foo')).toEqual(expected);
  });

  it('should write: no existing key', () => {
    const obj = {};
    const path = 'foo.fiz.fuzz';
    const expected = {
      foo: {
        fiz: {
          fuzz: 'boo',
        },
      },
    };

    expect(queryObject(path, obj, 'boo')).toEqual(expected);
  });

  it('should delete: empty string', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = '';
    const expected = { ...obj };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: * where * is an object', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = '*';
    const expected = {};

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: * where * is an array', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '*';
    const expected = [];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = 'foo';
    const expected = {
      fiz: 'buzz',
      fae: 'beez',
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.baz', () => {
    const obj = {
      foo: {
        baz: 'fiz',
      },
    };
    const path = 'foo.baz';
    const expected = {
      foo: {},
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.baz.fizz', () => {
    const obj = {
      foo: {
        baz: {
          fizz: 'buzz',
        },
      },
    };
    const path = 'foo.baz.fizz';
    const expected = {
      foo: {
        baz: {},
      },
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: [0]', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '[0]';
    const expected = [
      'buzz',
      'beez',
    ];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: [0][1]', () => {
    const obj = [
      ['baz', 'buzz', 'beez'],
    ];
    const path = '[0][1]';
    const expected = [
      ['baz', 'beez'],
    ];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo[0]', () => {
    const obj = {
      foo: ['baz', 'buzz', 'beez'],
    };
    const path = 'foo[0]';
    const expected = {
      foo: ['buzz', 'beez'],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: [1].fiz', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: 'buzz' },
    ];
    const path = '[1].fiz';
    const expected = [
      { foo: 'baz' },
      {},
    ];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: [1].fiz[0]', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: ['baz', 'buzz', 'beez'] },
    ];
    const path = '[1].fiz[0]';
    const expected = [
      { foo: 'baz' },
      { fiz: ['buzz', 'beez'] },
    ];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: [1].fiz[0][1]', () => {
    const obj = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 'buzz', 'beez'],
        ],
      },
    ];
    const path = '[1].fiz[0][1]';
    const expected = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 'beez'],
        ],
      },
    ];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo[0].fiz', () => {
    const obj = {
      foo: [
        { fiz: 'buzz' },
      ],
    };
    const path = 'foo[0].fiz';
    const expected = {
      foo: [
        {},
      ],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.fizz[0].fiz[1][2].value', () => {
    const obj = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                { value: 'buzz' },
              ],
            ],
          },
        ],
      },
    };
    const path = 'foo.fizz[0].fiz[1][2].value';
    const expected = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                {},
              ],
            ],
          },
        ],
      },
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.* where * is an object', () => {
    const obj = {
      foo: {
        foo: 'baz',
        fiz: 'buzz',
        fae: 'beez',
      },
    };
    const path = 'foo.*';
    const expected = {
      foo: {},
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.* where * is an array', () => {
    const obj = {
      foo: [
        'baz',
        'buzz',
        'beez',
      ],
    };
    const path = 'foo.*';
    const expected = {
      foo: [],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: *.foo where * is an object', () => {
    const obj = {
      a: { foo: 'baz' },
      b: { foo: 'buzz' },
      c: { foo: 'boo' },
    };
    const path = '*.foo';
    const expected = {
      a: {},
      b: {},
      c: {},
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: *.foo where * is an array', () => {
    const obj = [
      { foo: 'baz' },
      { foo: 'buzz' },
      { foo: 'boo' },
    ];
    const path = '*.foo';
    const expected = [
      {},
      {},
      {},
    ];

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.*.fiz where * is an object', () => {
    const obj = {
      foo: {
        a: { fiz: 'baz' },
        b: { fiz: 'buzz' },
        c: { fiz: 'boo' },
      },
    };
    const path = 'foo.*.fiz';
    const expected = {
      foo: {
        a: {},
        b: {},
        c: {},
      },
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo.*.baz where * is an array', () => {
    const obj = {
      foo: [
        { fiz: 'baz' },
        { fiz: 'buzz' },
        { fiz: 'boo' },
      ],
    };
    const path = 'foo.*.fiz';
    const expected = {
      foo: [
        {},
        {},
        {},
      ],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo[0].fiz.* where * is an object', () => {
    const obj = {
      foo: [
        {
          fiz: {
            a: { foo: 'baz' },
            b: { foo: 'buzz' },
            c: { foo: 'boo' },
          },
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const expected = {
      foo: [
        {
          fiz: {},
        },
      ],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: foo[0].fiz.* where * is an array', () => {
    const obj = {
      foo: [
        {
          fiz: [
            'baz',
            'buzz',
            'boo',
          ],
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const expected = {
      foo: [
        {
          fiz: [],
        },
      ],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: fizz.*[0] where * is an object', () => {
    const obj = {
      fizz: {
        a: ['baz'],
        b: ['buzz'],
        c: ['boo'],
      },
    };
    const path = 'fizz.*[0]';
    const expected = {
      fizz: {
        a: [],
        b: [],
        c: [],
      },
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });

  it('should delete: fizz.*[0] where * is an array', () => {
    const obj = {
      fizz: [
        ['baz'],
        ['buzz'],
        ['boo'],
      ],
    };
    const path = 'fizz.*[0]';
    const expected = {
      fizz: [
        [],
        [],
        [],
      ],
    };

    expect(queryObject(path, obj, undefined)).toEqual(expected);
  });


  it('should resolve: * where * is an object', () => {
    const obj = {
      a: 10,
      b: 20,
      c: 30,
    };
    const path = '*';
    const resolver = x => 2 * x;
    const expected = {
      a: 20,
      b: 40,
      c: 60,
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: * where * is an array', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '*';
    const resolver = x => x.slice(1);
    const expected = [
      'az',
      'uzz',
      'eez',
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo', () => {
    const obj = {
      foo: 'baz',
      fiz: 'buzz',
      fae: 'beez',
    };
    const path = 'foo';
    const resolver = x => x + x;
    const expected = {
      foo: 'bazbaz',
      fiz: 'buzz',
      fae: 'beez',
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.baz', () => {
    const obj = {
      foo: {
        baz: 50,
      },
    };
    const path = 'foo.baz';
    const resolver = x => 0.5 * x;
    const expected = {
      foo: {
        baz: 25,
      },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.baz.fizz', () => {
    const obj = {
      foo: {
        baz: {
          fizz: 'buzz',
        },
      },
    };
    const path = 'foo.baz.fizz';
    const resolver = x => x.replace(/z/g, '');
    const expected = {
      foo: {
        baz: {
          fizz: 'bu',
        },
      },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: [0]', () => {
    const obj = [
      'baz',
      'buzz',
      'beez',
    ];
    const path = '[0]';
    const resolver = () => 'boo';
    const expected = [
      'boo',
      'buzz',
      'beez',
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: [0][1]', () => {
    const obj = [
      ['baz', 'buzz', 'beez'],
    ];
    const path = '[0][1]';
    const resolver = x => x + x;
    const expected = [
      ['baz', 'buzzbuzz', 'beez'],
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo[0]', () => {
    const obj = {
      foo: [50, 'buzz', 'beez'],
    };
    const path = 'foo[0]';
    const resolver = x => 2 * x;
    const expected = {
      foo: [100, 'buzz', 'beez'],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: [1].fiz', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: 'buzz' },
    ];
    const path = '[1].fiz';
    const resolver = x => x + x;
    const expected = [
      { foo: 'baz' },
      { fiz: 'buzzbuzz' },
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: [1].fiz[0]', () => {
    const obj = [
      { foo: 'baz' },
      { fiz: [50, 'buzz', 'beez'] },
    ];
    const path = '[1].fiz[0]';
    const resolver = x => 2 * x;
    const expected = [
      { foo: 'baz' },
      { fiz: [100, 'buzz', 'beez'] },
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: [1].fiz[0][1]', () => {
    const obj = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 10, 'beez'],
        ],
      },
    ];
    const path = '[1].fiz[0][1]';
    const resolver = x => 2 * x;
    const expected = [
      { foo: 'baz' },
      {
        fiz: [
          ['baz', 20, 'beez'],
        ],
      },
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo[0].fiz', () => {
    const obj = {
      foo: [
        { fiz: 40 },
      ],
    };
    const path = 'foo[0].fiz';
    const resolver = x => 2 * x;
    const expected = {
      foo: [
        { fiz: 80 },
      ],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.fizz[0].fiz[1][2].value', () => {
    const obj = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                { value: 'buzz' },
              ],
            ],
          },
        ],
      },
    };
    const path = 'foo.fizz[0].fiz[1][2].value';
    const resolver = () => undefined;
    const expected = {
      foo: {
        fizz: [
          {
            fiz: [
              'baz',
              [
                'beez',
                'boo',
                {},
              ],
            ],
          },
        ],
      },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.* where * is an object', () => {
    const obj = {
      foo: {
        foo: 'baz',
        fiz: 'buzz',
        fae: 'beez',
      },
    };
    const path = 'foo.*';
    const resolver = x => (x.length > 3 ? undefined : x);
    const expected = {
      foo: {
        foo: 'baz',
      },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.* where * is an array', () => {
    const obj = {
      foo: [
        'baz',
        'buzz',
        'beez',
      ],
    };
    const path = 'foo.*';
    const resolver = x => (x.length > 3 ? undefined : x);
    const expected = {
      foo: ['baz'],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: *.foo where * is an object', () => {
    const obj = {
      a: { foo: 'baz' },
      b: { foo: 'buzz' },
      c: { foo: 'boo' },
    };
    const path = '*.foo';
    const resolver = x => (x.length > 3 ? undefined : x);
    const expected = {
      a: { foo: 'baz' },
      b: {},
      c: { foo: 'boo' },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: *.foo where * is an array', () => {
    const obj = [
      { foo: 'baz' },
      { foo: 'buzz' },
      { foo: 'boo' },
    ];
    const path = '*.foo';
    const resolver = x => (x.length < 4 ? undefined : x);
    const expected = [
      {},
      { foo: 'buzz' },
      {},
    ];

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.*.fiz where * is an object', () => {
    const obj = {
      foo: {
        a: { fiz: 'baz' },
        b: { fiz: 'buzz' },
        c: { fiz: 'boo' },
      },
    };
    const path = 'foo.*.fiz';
    const resolver = x => (x.length > 3 ? undefined : x.replace(/b/g, ''));
    const expected = {
      foo: {
        a: { fiz: 'az' },
        b: {},
        c: { fiz: 'oo' },
      },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo.*.baz where * is an array', () => {
    const obj = {
      foo: [
        { fiz: 'baz' },
        { fiz: 'buzz' },
        { fiz: 'boo' },
      ],
    };
    const path = 'foo.*.fiz';
    const resolver = x => (x.length > 3 ? undefined : x.replace(/b/g, ''));
    const expected = {
      foo: [
        { fiz: 'az' },
        {},
        { fiz: 'oo' },
      ],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo[0].fiz.* where * is an object', () => {
    const obj = {
      foo: [
        {
          fiz: {
            a: { foo: 20 },
            b: { foo: 20 },
            c: { foo: 20 },
          },
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const resolver = x => 2 * x.foo;
    const expected = {
      foo: [
        {
          fiz: {
            a: 40,
            b: 40,
            c: 40,
          },
        },
      ],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: foo[0].fiz.* where * is an array', () => {
    const obj = {
      foo: [
        {
          fiz: [
            'baz',
            'buzz',
            'boo',
          ],
        },
      ],
    };
    const path = 'foo[0].fiz.*';
    const resolver = x => x.replace(/b/g, '');
    const expected = {
      foo: [
        {
          fiz: [
            'az',
            'uzz',
            'oo',
          ],
        },
      ],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: fizz.*[0] where * is an object', () => {
    const obj = {
      fizz: {
        a: ['baz'],
        b: ['buzz'],
        c: ['boo'],
      },
    };
    const path = 'fizz.*[0]';
    const resolver = x => x.slice(2);
    const expected = {
      fizz: {
        a: ['z'],
        b: ['zz'],
        c: ['o'],
      },
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });

  it('should resolve: fizz.*[0] where * is an array', () => {
    const obj = {
      fizz: [
        ['baz'],
        ['buzz'],
        ['boo'],
      ],
    };
    const path = 'fizz.*[0]';
    const resolver = x => x.slice(2);
    const expected = {
      fizz: [
        ['z'],
        ['zz'],
        ['o'],
      ],
    };

    expect(queryObject(path, obj, resolver)).toEqual(expected);
  });
});
