const { showError } = require('./show-error');
const { stdin, stdout } = require('process');

function parseArgs(args) {
	const config = getByFlags(args, ['-c', '--config']);
	const argsObj = {};

	if (!config) showError('Error! No config param!');
	argsObj.config = config;

	const input = getByFlags(args, ['-i', '--input']);
	argsObj.input = input || stdin;

	const output = getByFlags(args, ['-o', '--output']);
	argsObj.output = output || stdout;

	return argsObj;
}

function getByFlags(args, flags) {
	let param = null;

	for (flag of flags) {
		const flagIndex = args.indexOf(flag);

		if (flagIndex === -1) continue;
		if (param || args.slice(flagIndex + 1).indexOf(flag) !== -1)
			showError(`Error! Param ${flag} duplicated!`);

		param = args[flagIndex + 1];
	}

	return param;
}

module.exports = {
	parseArgs,
};
