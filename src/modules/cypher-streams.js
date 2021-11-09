const { Transform } = require('stream');
const { encode } = require('./../modules/encode');

class Caesar extends Transform {
	constructor(isEnc, ...options) {
		super(options);
		this.isEnc = isEnc;
	}

	_transform(chunk, encoding, done) {
		const encoded = encode(chunk, 1, this.isEnc);
		done(null, encoded);
	}
}

module.exports = {
	Caesar,
};
