const { stderr } = require('process');

function showError(e) {
  stderr.write(`${e.name}: ${e.message}`);
  process.exit(1);
}

module.exports = {
  showError,
};
