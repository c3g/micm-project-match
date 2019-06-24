import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { User, Professor } from '../models';
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
  verified,
  professor,
  cvLocation
}) => ({
  id,
  firstName,
  lastName,
  tel,
  email,
  type,
  strategy,
  approved,
  verified,
  professor,
  cvUploaded: !!cvLocation
});

function localAuth(email, password, done) {
  const user = User.findByEmail({ email });
  const professor = user
    .then(user => Professor.findByUserId(user.id))
    .catch(err =>
      err.type === k.ACCOUNT_NOT_FOUND ? null : Promise.reject(err)
    );
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
  Promise.all([user, valid, professor])
    .then(([user, result, professor]) =>
      result ? done(null, clean({ ...user, professor })) : done(null, false)
    )
    .catch(err =>
      err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
    );
}

function oAuth(strategy) {
  return function(accessToken, refreshToken, profile, done) {
    const user = User.findByIdentifier(profile.id, strategy);
    const professor = user
      .then(user => Professor.findByUserId(user.id))
      .catch(err =>
        err.type === k.ACCOUNT_NOT_FOUND ? null : Promise.reject(err)
      );
    Promise.all([user, professor])
      .then(([user, professor]) => done(null, clean({ ...user, professor })))
      .catch(err =>
        err.type === k.ACCOUNT_NOT_FOUND
          ? User.createOAuth(profile, strategy)
              .then(user => done(null, clean({ ...user, professor: null })))
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
    User.findProfessorById(id)
      .then(user => done(null, clean(user)))
      .catch(err =>
        err.type === k.ACCOUNT_NOT_FOUND ? done(null, false) : done(err)
      );
  });
};
