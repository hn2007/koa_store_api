const Router = require('koa-router');
const userRouter = require('./user');

const api = new Router({
	prefix: '/api',
});

api.use('/users', userRouter.routes());

module.exports = api;
