/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/koa_vue', { useMongoClient: true }).then(() => {
	console.log('Successfully connected to MongoDB');
}).catch((err) => {
	console.error(err);
});
