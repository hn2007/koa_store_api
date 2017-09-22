const bodyParser = require('koa-bodyparser');
const pick = require('lodash/pick');
const Koa = require('koa');
const cors = require('koa-cors');

require('./common/connect');

const apiRouter = require('./router');
const responseHandler = require('./common/response');
const passport = require('./common/passport');

const app = new Koa();

app.use(cors());
app.use(responseHandler({ contentType: 'application/json' }));
app.use(passport.initialize());

app.use(async (ctx, next) => {
	try {
		await next();
	} catch (e) {
		if (e.name === 'ValidationError') {
			if (e.errors) {
				ctx.res.unprocessableEntity(Object.values(e.errors).map(value => pick(value, ['message', 'name'])));
			} else if (e.details) {
				ctx.res.unprocessableEntity(e.details.map(error => pick(error, ['message', 'name'])));
			}
		} else {
			console.log(e);
		}
	}
});

app.use(bodyParser());
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

module.exports = app;
