const { Transform } = require('stream');
const { encode } = require('../modules/encode');

class Atbash extends Transform {
  constructor(...options) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    const encoded = encode(chunk, null, true);
    done(null, encoded);
  }
}

module.exports = {
  Atbash,
};
