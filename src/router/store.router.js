const ObjectId = require('mongoose').Types.ObjectId;
const { default: validator, object, number } = require('koa-context-validator');
const passport = require('koa-passport');
const Router = require('koa-router');

const Store = require('../models/Store');

const storeRouter = Router({
	prefix: '/stores',
});

storeRouter
	.param('id', async (id, ctx, next) => {
		if (!ObjectId.isValid(id)) {
			return ctx.res.badRequest(undefined, 'Id isn\'t valid');
		}
		await next();
	})
	.get('/',
		passport.authenticate('jwt', { session: false }),
		validator({
			query: object().keys({
				limit: number().default(20),
				offset: number().default(0),
			}),
		}, { stripUnknown: true }),
		async (ctx) => {
			const options = { limit: ctx.query.limit, offset: ctx.query.offset };
			if (ctx.query.self) {
				options.admins = ctx.state.user.id;
			}
			const [stores, allStores] = await Promise.all([
				Store.find({ admins: ctx.state.user.id }).skip(ctx.query.offset).limit(ctx.query.limit),
				Store.find({ admins: ctx.state.user.id }).count(),
			]);
			ctx.res.ok({ stores, allStores, filteredStores: stores.length }, 'Stores list provided');
		})
	.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
		const storeData = Object.assign({}, ctx.request.body, { admins: [ctx.state.user._id] });
		ctx.res.ok(await Store.create(storeData), 'Store successfully created');
	})
	.get('/:id', async (ctx) => {
		const store = await Store.findById(ctx.params.id);
		if (store) {
			ctx.res.ok(store, 'Store info provided');
		} else {
			ctx.res.notFound(undefined, 'User not found');
		}
	})
	.delete('/:id', passport.authenticate('jwt', { session: false }), async (ctx) => {
		const store = await Store.findOne({ _id: ctx.params.id });
		if (!store) {
			return ctx.res.notFound(undefined, 'Store not found');
		}
		if (store.isAdmin(ctx.state.user.id)) {
			await store.remove();
			ctx.res.ok(undefined, `${store.name} has been removed`);
		} else {
			ctx.res.notFound(undefined, 'You haven\'t permission to contribute this store');
		}
	});

module.exports = storeRouter;
