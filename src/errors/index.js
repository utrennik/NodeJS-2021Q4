const { ConfigError } = require('./config-error');
const { FileReadError } = require('./file-read-error');
const { FileWriteError } = require('./file-write-error');
const { ParamError } = require('./param-error');

module.exports = {
  ConfigError,
  FileReadError,
  FileWriteError,
  ParamError,
};
