const { pipeline } = require('stream');
const { parseArgs } = require('./modules/parse-args');
const { getInputStream, getOutputStream } = require('./modules/io');
const { Caesar } = require('./modules/cypher-streams');

// const cypherArgs = argsObj.config.split(/\-/);

const { argv } = process;
const args = argv.slice(2);
const argsObj = parseArgs(args);

const inputStream = getInputStream(argsObj.input, __dirname);
const outputStream = getOutputStream(argsObj.output, __dirname);

pipeline(inputStream, new Caesar(false), outputStream, () => {
	console.log('ok');
	process.exit(0);
});
