const { stderr } = require('process');

function showError(msg) {
	stderr.write(msg);
	process.exit(1);
}

module.exports = {
	showError,
};
