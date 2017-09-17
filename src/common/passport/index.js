const passport = require('koa-passport');

const JwtStrategy = require('./JwtStrategy');

passport.use(JwtStrategy);

module.exports = passport;
