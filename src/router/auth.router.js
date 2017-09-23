const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

const User = require('../models/User');

const userRouter = Router({
	prefix: '/auth',
});

userRouter
	.post('/login', async (ctx) => {
		const user = await User.findOne({ email: ctx.request.body.email });
		if (user) {
			const isPasswordCorrect = await user.comparePassword(ctx.request.body.password);
			if (isPasswordCorrect) {
				const token = jwt.sign({ id: user._id }, 'secret');
				return ctx.res.ok({ user, token }, 'Successfully logged In');
			}
		}
		return ctx.res.badRequest(undefined, 'Email or password is incorrect');
	})
	.get('/me', passport.authenticate('jwt', { session: false }), async (ctx) => {
		ctx.res.ok({ data: ctx.state.user });
	});

module.exports = userRouter;
