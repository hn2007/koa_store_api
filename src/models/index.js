
require('fs').readdirSync(__dirname).forEach((file) => {
	const name = file.replace(/\.[^/.]+$/, '');
	if (name !== 'index') {
		// eslint-disable-next-line global-require,import/no-dynamic-require
		exports[name] = require(`./${file}`);
	}
});
