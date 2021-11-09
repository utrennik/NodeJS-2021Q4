const { stdin, stdout } = require('process');
const fs = require('fs');
const path = require('path');
const { showError } = require('./show-error');

function getInputStream(inputFile, rootdir) {
	if (!inputFile) {
		stdout.write('Please enter the string to encode: ');
		return stdin;
	} else {
		const filePath = path.join(rootdir, inputFile);
		return fs.createReadStream(filePath, 'utf-8').on('error', (e) => {
			showError(e.message);
		});
	}
}

function getOutputStream(outputFile, rootdir) {
	if (!outputFile) {
		return stdout;
	} else {
		const filePath = path.join(rootdir, outputFile);
		return fs.createWriteStream(filePath).on('error', (e) => {
			showError(e.message);
		});
	}
}

module.exports = {
	getInputStream,
	getOutputStream,
};