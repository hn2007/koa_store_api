const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = new JwtStrategy(opts, ((jwtPayload, done) => {
	User.findById(jwtPayload.id, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	});
}));
