const { encode } = require('../modules/encode');

describe('Testing encode function in encoding mode', () => {
  it('Atbash encoding', async () => {
    expect(encode('Alex', null, true)).toStrictEqual('Zovc');
  });

  it('Caesar encoding', async () => {
    expect(encode('Alex', 1, true)).toStrictEqual('Bmfy');
  });

  it('ROT-8 encoding', async () => {
    expect(encode('Alex', 8, true)).toStrictEqual('Itmf');
  });
});

describe('Testing encode function in decoding mode', () => {
  it('Atbash decoding', async () => {
    expect(encode('Zovc', null, false)).toStrictEqual('Alex');
  });

  it('Caesar decoding', async () => {
    expect(encode('Bmfy', 1, false)).toStrictEqual('Alex');
  });

  it('ROT-8 decoding', async () => {
    expect(encode('Itmf', 8, false)).toStrictEqual('Alex');
  });
});

describe('Testing encode function witn non-english letters', () => {
  it('Atbash decoding', async () => {
    expect(encode('Тест', null, false)).toStrictEqual('Тест');
  });

  it('Caesar decoding', async () => {
    expect(encode('Тест', 1, false)).toStrictEqual('Тест');
  });

  it('ROT-8 decoding', async () => {
    expect(encode('Тест', 8, false)).toStrictEqual('Тест');
  });

  it('Atbash encoding', async () => {
    expect(encode('Тест', null, true)).toStrictEqual('Тест');
  });

  it('Caesar encoding', async () => {
    expect(encode('Тест', 1, true)).toStrictEqual('Тест');
  });

  it('ROT-8 encoding', async () => {
    expect(encode('Тест', 8, true)).toStrictEqual('Тест');
  });
});