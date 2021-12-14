import { Strategy as LocalStrategy } from 'passport-local';
// eslint-disable-next-line import/extensions
import { checkPassword } from '../helper.js';
// eslint-disable-next-line import/extensions
import User from '../schema/index.js';

export default function authenticate(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    let user;
    try {
      user = await User.findOne({ email });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'The user does not exist' });
    }

    if (!(await checkPassword(password.toString(), user.password))) {
      return done(null, false, { message: 'Password is incorrect' });
    }
    return done(null, user);
  }));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    let user;
    try {
      user = await User.findOne({ id });
    } catch (err) {
      return done(err, false);
    }
    return done(null, user);
  });
}
