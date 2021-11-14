const fs = require('fs');
const { Writable } = require('stream');

class FileWriteStream extends Writable {
  constructor(fileName) {
    super();
    this.fileName = fileName;
  }

  _construct(callback) {
    fs.open(this.fileName, 'a', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = FileWriteStream;
