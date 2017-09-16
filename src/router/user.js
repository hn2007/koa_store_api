const Router = require('koa-router');

const userRouter = Router();

userRouter.get('/', async function (ctx, next) {
	ctx.status = 201;
	ctx.body = 'Narek';
});

module.exports = userRouter;
