const FIRST_CAPITAL_CODE = 65;
const FIRST_SMALL_CODE = 97;
const LETTERS_QUANTITY = 26;
const LAST_CAPITAL_CODE = FIRST_CAPITAL_CODE + LETTERS_QUANTITY;
const LAST_SMALL_CODE = FIRST_SMALL_CODE + LETTERS_QUANTITY;

function encode(data, shift, isEncoding) {
  const arr = `${data}`.trim().split('');
  return arr
    .map((char) => {
      const charCode = char.charCodeAt(0);
      if (
        charCode < FIRST_CAPITAL_CODE
        || (charCode > LAST_CAPITAL_CODE && charCode < FIRST_SMALL_CODE)
        || charCode > LAST_SMALL_CODE
      ) return char;

      let newCharCode;
      let charStartPos;
      let absShift;

      if (shift === null) {
        if (charCode <= LAST_CAPITAL_CODE) {
          newCharCode = FIRST_CAPITAL_CODE + LETTERS_QUANTITY - (charCode - FIRST_CAPITAL_CODE + 1);
        } else {
          newCharCode = FIRST_SMALL_CODE + LETTERS_QUANTITY - (charCode - FIRST_SMALL_CODE + 1);
        }
        return String.fromCharCode(newCharCode);
      }

      if (charCode <= LAST_CAPITAL_CODE) {
        charStartPos = charCode - FIRST_CAPITAL_CODE;
        absShift = isEncoding
          ? (charStartPos + shift) % LETTERS_QUANTITY
          : (charStartPos + (LETTERS_QUANTITY - shift)) % LETTERS_QUANTITY;
        newCharCode = FIRST_CAPITAL_CODE + absShift;
      } else {
        charStartPos = charCode - FIRST_SMALL_CODE;
        absShift = isEncoding
          ? (charStartPos + shift) % LETTERS_QUANTITY
          : (charStartPos + (LETTERS_QUANTITY - shift)) % LETTERS_QUANTITY;
        newCharCode = FIRST_SMALL_CODE + absShift;
      }

      return String.fromCharCode(newCharCode);
    })
    .join('');
}

module.exports = {
  encode,
};
