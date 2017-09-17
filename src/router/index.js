const Router = require('koa-router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const storeRouter = require('./store.router');

const api = new Router({
	prefix: '/api',
});

api.use(userRouter.routes());
api.use(authRouter.routes());
api.use(storeRouter.routes());

module.exports = api;
