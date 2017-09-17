const Router = require('koa-router');
const User = require('../models/User');

const userRouter = Router({
	prefix: '/users',
});

userRouter
	.get('/', async (ctx) => {
		ctx.body = await User.find();
	})
	.post('/', async (ctx) => {
		ctx.body = await User.create(ctx.request.body);
	})
	.get('/:id', async (ctx) => {
		const user = await User.findById(ctx.params.id);
		if (user) {
			ctx.status = 200;
			ctx.body = { body: user };
		} else {
			ctx.status = 404;
			ctx.body = { message: 'User not found' };
		}
	})
	.delete('/:id', async (ctx) => {
		const user = await User.findByIdAndRemove(ctx.params.id);
		if (user) {
			ctx.res.ok({ message: `${user.name} has been removed` });
		} else {
			ctx.res.notFound({ message: 'User not found' });
		}
	});

module.exports = userRouter;
