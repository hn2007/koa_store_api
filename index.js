const app = require('./src');

const PORT = 3000;

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`server running on http://localhost:${PORT}`);
});
