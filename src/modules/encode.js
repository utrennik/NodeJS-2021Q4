const FIRST_CAPITAL_CODE = 65;
const LAST_CAPITAL_CODE = 90;
const FIRST_SMALL_CODE = 97;
const LAST_SMALL_CODE = 122;

const CAPITALS = LAST_CAPITAL_CODE - FIRST_CAPITAL_CODE + 1;
const SMALLS = LAST_SMALL_CODE - FIRST_SMALL_CODE + 1;

function encode(data, shift, isEncoding) {
	const arr = `${data}`.trim().split('');
	return arr
		.map((char) => {
			const charCode = char.charCodeAt(0);
			if (
				charCode < FIRST_CAPITAL_CODE ||
				(charCode > LAST_CAPITAL_CODE && charCode < FIRST_SMALL_CODE) ||
				charCode > LAST_SMALL_CODE
			)
				return char;

			let newCharCode, charStartPos, absShift;

			if (charCode <= LAST_CAPITAL_CODE) {
				charStartPos = charCode - FIRST_CAPITAL_CODE;
				absShift = isEncoding
					? (charStartPos + shift) % CAPITALS
					: (charStartPos + (CAPITALS - shift)) % CAPITALS;
				newCharCode = FIRST_CAPITAL_CODE + absShift;
			} else {
				charStartPos = charCode - FIRST_SMALL_CODE;
				absShift = isEncoding
					? (charStartPos + shift) % SMALLS
					: (charStartPos + (SMALLS - shift)) % SMALLS;
				newCharCode = FIRST_SMALL_CODE + absShift;
			}

			return String.fromCharCode(newCharCode);
		})
		.join('');
}

module.exports = {
	encode,
};
