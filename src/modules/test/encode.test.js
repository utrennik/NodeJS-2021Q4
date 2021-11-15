const { encode } = require('../encode');

describe('Testing encode function', () => {
  it('Atbash encoding', (done) => {
    expect(encode('Alex', null, true)).toStrictEqual('Zovc');
    done();
  });
});
