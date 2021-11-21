function isEncodingParamValid(param) {
  return param === '1' || param === '0';
}

function validateConfig(config) {
  const argsArr = config.split(/-/);

  let isConfigValid = true;

  argsArr.forEach((el) => {
    if (el.length > 2) isConfigValid = false;

    const cypherLetter = el[0];
    const encodingParam = el[1];
    const isValid = isEncodingParamValid(encodingParam);

    switch (cypherLetter) {
      case 'A':
        if (encodingParam) isConfigValid = false;
        break;

      case 'C': {
        if (!isValid) isConfigValid = false;
        break;
      }

      case 'R': {
        if (!isValid) isConfigValid = false;
        break;
      }

      default:
        isConfigValid = false;
    }
  });

  return isConfigValid;
}

module.exports = {
  validateConfig,
};
