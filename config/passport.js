const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    try {
      // Find user in database
      // Example: User.findById(jwtPayload.id, (err, user) => ...)
      return done(null, jwtPayload);
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
