const { stdin, stdout } = require('process');
const fs = require('fs');
const path = require('path');
const FileReadError = require('../errors/file-read-error');
const FileWriteError = require('../errors/file-write-error');

function getInputStream(inputFile, rootdir) {
  if (!inputFile) {
    stdout.write('Please enter the string to encode: ');
    return stdin;
  }
  const filePath = path.join(rootdir, inputFile);
  return fs.createReadStream(filePath, 'utf-8').on('error', (e) => {
    throw new FileReadError(e.message);
  });
}

function getOutputStream(outputFile, rootdir) {
  if (!outputFile) {
    return stdout;
  }
  const filePath = path.join(rootdir, outputFile);
  if (!fs.existsSync(filePath)) {
    throw new FileWriteError('Error! Output file not found!');
  }
  return fs
    .createWriteStream(filePath, {
      flags: 'a',
    })
    .on('error', (e) => {
      throw new FileWriteError(e.message);
    });
}

module.exports = {
  getInputStream,
  getOutputStream,
};
