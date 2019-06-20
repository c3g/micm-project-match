import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { User } from '../models';
import k from '../constants';
import { rejectMessage } from '../utils/promise';

const config = {
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'first_name', 'last_name', 'email']
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }
};

export const clean = ({
  id,
  firstName,
  lastName,
  tel,
  email,
  type,
  strategy,
  approved,
  verified
}) => ({
  id,
  firstName,
  lastName,
  tel,
  email,
  type,
  strategy,
  approved,
  verified
});

function localAuth(email, password, done) {
  const user = User.findByEmail({ email });
  const valid = user.then(user =>
    user.strategy !== k.STRATEGY.LOCAL
      ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
      : user.password === null
      ? rejectMessage(
          'You have not set a password yet. Try forgot password',
          k.PASSWORD_NOT_SET
        )
      : User.validatePassword(user, password)
  );
  Promise.all([user, valid])
    .then(([user, result]) =>
      result ? done(null, clean(user)) : done(null, false)
    )
    .catch(err =>
      err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
    );
}

function oAuth(strategy) {
  return function(accessToken, refreshToken, profile, done) {
    User.findByIdentifier(profile.id, strategy)
      .then(user => done(null, clean(user)))
      .catch(err =>
        err.type === k.ACCOUNT_NOT_FOUND
          ? User.createOAuth(profile, strategy)
              .then(user => done(null, clean(user)))
              .catch(done)
          : done(err)
      );
  };
}

export default passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      localAuth
    )
  );

  passport.use(
    new FacebookStrategy(config.facebook, oAuth(k.STRATEGY.FACEBOOK))
  );
  passport.use(new GoogleStrategy(config.google, oAuth(k.STRATEGY.GOOGLE)));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => done(null, clean(user)))
      .catch(err =>
        err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
      );
  });
};
