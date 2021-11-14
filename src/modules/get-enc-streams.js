const { Caesar } = require('../streams/caesar');
const { Atbash } = require('../streams/atbash');
const { Rot8 } = require('../streams/rot-8');
const { showError } = require('./show-error');
const { validateConfig } = require('./validate-config');

function getEncStreams(config) {
  if (!validateConfig(config)) showError('Error! Config is invalid!');

  const argsArr = config.split(/-/);

  const streams = argsArr.map((el) => {
    const cypherLetter = el[0];
    const encodingParam = el[1];
    const isEncoding = !!+encodingParam;

    switch (cypherLetter) {
      case 'A':
        return new Atbash();

      case 'C': {
        return new Caesar(isEncoding);
      }

      case 'R': {
        return new Rot8(isEncoding);
      }
    }
  });

  return streams;
}

module.exports = {
  getEncStreams,
};
