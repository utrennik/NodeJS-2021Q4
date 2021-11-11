const { stdin, stdout } = require('process');
const fs = require('fs');
const path = require('path');
const { showError } = require('./show-error');

function getInputStream(inputFile, rootdir) {
  if (!inputFile) {
    stdout.write('Please enter the string to encode: ');
    return stdin;
  }
  const filePath = path.join(rootdir, inputFile);
  return fs.createReadStream(filePath, 'utf-8').on('error', (e) => {
    showError(e.message);
  });
}

function getOutputStream(outputFile, rootdir) {
  if (!outputFile) {
    return stdout;
  }
  const filePath = path.join(rootdir, outputFile);
  if (!fs.existsSync(filePath)) {
    showError('Error! Output file not found!');
  }
  return fs.createWriteStream(filePath).on('error', (e) => {
    showError(e.message);
  });
}

module.exports = {
  getInputStream,
  getOutputStream,
};
