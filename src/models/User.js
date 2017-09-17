const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validator = require('validator');
const mongoose = require('mongoose');
const pick = require('lodash/pick');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: 'email ({VALUE}) already exists',
		validate: {
			validator: value => validator.isEmail(value),
			message: '{VALUE} is not a valid email!',
		},
	},
	password: String,
});
UserSchema.plugin(beautifyUnique);
UserSchema.pre('save', function (next) {
	const user = this;
 
	if (!user.isModified('password')) {
		return next();
	}
 
	bcrypt.hash(user.password, 10, (err, hash) => {
		if (err) {
			return next(err);
		}
		user.password = hash;
		return next();
	});
});

UserSchema.publicFields = ['_id', 'name', 'email'];
UserSchema.methods.toJSON = function() {
	const obj = this.toObject();
	return pick(obj, UserSchema.publicFields);
};


UserSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
