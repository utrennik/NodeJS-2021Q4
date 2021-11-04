const { parseArgs } = require('./modules/parse-args');

const { argv } = process;
const args = argv.slice(2);
const argsObj = parseArgs(args);

console.dir(argsObj);
