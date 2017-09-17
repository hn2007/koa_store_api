const Router = require('koa-router');
const userRouter = require('./user');
const authRouter = require('./auth');

const api = new Router({
	prefix: '/api',
});

api.use(userRouter.routes());
api.use(authRouter.routes());

module.exports = api;
