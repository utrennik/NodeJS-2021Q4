const { Caesar } = require('../streams/caesar');
const { Atbash } = require('../streams/atbash');
const { Rot8 } = require('../streams/rot-8');
const { showError } = require('./show-error');

function isEncodingParamValid(param) {
  return param === '1' || param === '0';
}

function getEncStreams(config) {
  const argsArr = config.split(/-/);

  const streams = argsArr.map((el) => {
    const cypherLetter = el[0];
    const encodingParam = el[1];
    const isEncoding = !!+encodingParam;
    const isValid = isEncodingParamValid(encodingParam);

    switch (cypherLetter) {
      case 'A':
        if (encodingParam) showError('Error! Config is invalid!');
        return new Atbash();

      case 'C': {
        if (!isValid) showError('Error! Config is invalid!');
        return new Caesar(isEncoding);
      }

      case 'R': {
        if (!isValid) showError('Error! Config is invalid!');
        return new Rot8(isEncoding);
      }

      default:
        showError('Error! Config is invalid!');
    }
  });

  return streams;
}

module.exports = {
  getEncStreams,
};
