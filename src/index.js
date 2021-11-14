const { pipeline } = require('stream');
const { parseArgs } = require('./modules/parse-args');
const { getInputStream, getOutputStream } = require('./modules/io');
const { getEncStreams } = require('./modules/get-enc-streams');
const { showError } = require('./modules/show-error');

const { argv } = process;
const args = argv.slice(2);

try {
  const argsObj = parseArgs(args);
  const inputStream = getInputStream(argsObj.input, __dirname);
  const outputStream = getOutputStream(argsObj.output, __dirname);
  const encStreams = getEncStreams(argsObj.config);

  pipeline([inputStream, ...encStreams, outputStream], () => {
    process.exit(0);
  });
} catch (e) {
  showError(e);
}
