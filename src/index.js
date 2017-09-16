const Koa = require('koa');
const apiRouter = require('./router/index');

const PORT = 3000;

const app = new Koa();


app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`server running on http://localhost:${PORT}`);
});
