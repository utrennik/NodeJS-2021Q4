const { Transform } = require('stream');
const { encode } = require('../modules/encode');

class Rot8 extends Transform {
  constructor(isEnc, ...options) {
    super(options);
    this.isEnc = isEnc;
  }

  _transform(chunk, encoding, done) {
    const encoded = encode(chunk, 8, this.isEnc);
    done(null, encoded);
  }
}

module.exports = {
  Rot8,
};
