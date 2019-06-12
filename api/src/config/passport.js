import LocalStrategy from 'passport-local';
import { User } from '../models';
import k from '../constants';

function localAuth(email, password, done) {
  const user = User.findByEmail({ email });
  const valid = user.then(user => User.validatePassword(user, password));
  Promise.all([user, valid])
    .then(([user, result]) => (result ? done(null, user) : done(null, false)))
    .catch(err =>
      err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
    );
}

export default passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      localAuth
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
};
