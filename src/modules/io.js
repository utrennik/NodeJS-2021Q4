const { stdin, stdout } = require('process');
const fs = require('fs');
const path = require('path');
const FileReadStream = require('../streams/file-read-stream');
const FileWriteStream = require('../streams/file-write-stream');
const FileReadError = require('../errors/file-read-error');
const FileWriteError = require('../errors/file-write-error');

function getInputStream(inputFile, rootdir) {
  if (!inputFile) {
    stdout.write('Please enter the string to encode: ');
    return stdin;
  }
  const filePath = path.join(rootdir, inputFile);
  if (!fs.existsSync(filePath)) {
    throw new FileReadError('Input file not found!');
  }
  return new FileReadStream(filePath, 'utf-8').on('error', (e) => {
    throw new FileReadError('Input file not found!');
  });
}

function getOutputStream(outputFile, rootdir) {
  if (!outputFile) {
    return stdout;
  }
  const filePath = path.join(rootdir, outputFile);
  if (!fs.existsSync(filePath)) {
    throw new FileWriteError('Output file not found!');
  }
  return new FileWriteStream(filePath).on('error', (e) => {
    throw new FileWriteError('Output file not found!');
  });
}

module.exports = {
  getInputStream,
  getOutputStream,
};
