const mongoose = require('mongoose');
const pick = require('lodash/pick');

const StoreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		public: true,
	},
	public: {
		type: Boolean,
		default: false,
	},
	admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
StoreSchema.publicFields = ['_id', 'name', 'public'];
StoreSchema.methods.toJSON = function() {
	const obj = this.toObject();
	return pick(obj, StoreSchema.publicFields);
};

StoreSchema.methods.isAdmin = function(userObjectId) {
	return this.admins.some(objectId => objectId.equals(userObjectId));
};

module.exports = mongoose.model('Store', StoreSchema);
