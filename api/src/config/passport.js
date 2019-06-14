import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth';
import { User } from '../models';
import k from '../constants';
import { rejectMessage } from '../utils/promise';

const config = {
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  google: {
    consumerKey: process.env.GOOGLE_CONSUMER_KEY,
    consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }
};

function localAuth(email, password, done) {
  const user = User.findByEmail({ email });
  const valid = user.then(user =>
    user.password === null
      ? rejectMessage(
          'You have not set a password yet. Try forgot password',
          k.PASSWORD_NOT_SET
        )
      : User.validatePassword(user, password)
  );
  Promise.all([user, valid])
    .then(([user, result]) => (result ? done(null, user) : done(null, false)))
    .catch(err =>
      err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
    );
}

function facebookAuth(accessToken, refreshToken, profile, done) {
  User.findByIdentifier(profile.id, k.STRATEGY.FACEBOOK)
    .then(user => done(null, user))
    .catch(err =>
      err.type === k.ACCOUNT_NOT_FOUND
        ? User.createOAuth(profile, k.STRATEGY.FACEBOOK)
            .then(user => {
              const { password, token, ...userDetails } = user;
              done(null, userDetails);
            })
            .catch(done)
        : done(err)
    );
}

export default passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      localAuth
    )
  );

  passport.use(new FacebookStrategy(config.facebook, facebookAuth));
  // passport.use(new GoogleStrategy(config.google, googleAuth));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => done(null, user))
      .catch(err =>
        err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
      );
  });
};
