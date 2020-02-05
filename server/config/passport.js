const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const { User } = require('../models');

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
  };
  passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log('jwt_payload', jwt_payload);
      User.findByPk(jwt_payload.id)
        .then((user) => done(null, user))
        .catch((error) => done(error, false));
    }),
  );
};
