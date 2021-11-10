const { showError } = require('./show-error');

function getByFlags(args, flags) {
  let param = null;

  /* eslint-disable-next-line */
  for (const flag of flags) {
    const flagIndex = args.indexOf(flag);

    /* eslint-disable-next-line */
    if (flagIndex === -1) continue;
    if (param || args.slice(flagIndex + 1).indexOf(flag) !== -1)
      showError(`Error! Param ${flag} duplicated!`);

    param = args[flagIndex + 1];
  }

  return param;
}

function parseArgs(args) {
  const config = getByFlags(args, ['-c', '--config']);
  const argsObj = {};

  if (!config) showError('Error! No config param!');
  argsObj.config = config;

  const input = getByFlags(args, ['-i', '--input']);
  argsObj.input = input || null;

  const output = getByFlags(args, ['-o', '--output']);
  argsObj.output = output || null;

  return argsObj;
}

module.exports = {
  parseArgs,
};
