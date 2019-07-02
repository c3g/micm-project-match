import express from 'express';
import validator from '../utils/validator';
import schemas from '../schemas';
import multer from 'multer';
import auth from './auth';
import user from './user';
import project from './project';
import isAuthenticated from '../utils/isAuthenticated';
import k from '../constants';
import { errorHandler } from '../utils/handlers';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const allAccess = isAuthenticated([
  k.USER_TYPE.PROFESSOR,
  k.USER_TYPE.STUDENT,
  k.USER_TYPE.ADMIN,
  k.USER_TYPE.UNSET
]);
const professorAccess = isAuthenticated([
  k.USER_TYPE.PROFESSOR,
  k.USER_TYPE.ADMIN
]);

router.post('/register', validator(schemas.auth.register), auth.register);
router.get(
  '/register/resend/:email',
  validator(schemas.auth.registerResend),
  auth.registerResend
);
router.post(
  '/set-password',
  validator(schemas.auth.setPassword),
  auth.setPassword
);
router.post(
  '/forgot-password',
  validator(schemas.auth.forgotPassword),
  auth.forgotPassword
);
router.get('/logout', auth.logout);
router.get(
  '/email/verify/:token',
  validator(schemas.auth.verifyEmail),
  auth.verifyEmail
);

router.get('/user', user.userData);
router.get('/user/oauth', allAccess, user.oauthData);
router.post(
  '/user/update',
  validator(schemas.user.updateUser),
  allAccess,
  user.updateUser
);
router.post(
  '/professor/update',
  validator(schemas.user.updateProfessor),
  professorAccess,
  user.updateProfessor
);
router.post('/cv/update', upload.single('cv'), allAccess, user.updateCv);

router.post(
  '/project/create',
  upload.array('files'),
  (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (err) {
      errorHandler(res)(err);
    }
  },
  validator(schemas.project.create),
  professorAccess,
  project.create
);

export default passport => {
  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );
  router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: process.env.OAUTH_SUCCESS_REDIRECT || '/',
      failureRedirect: process.env.OAUTH_FAILURE_REDIRECT || '/signin'
    })
  );
  router.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: process.env.OAUTH_SUCCESS_REDIRECT || '/',
      failureRedirect: process.env.OAUTH_FAILURE_REDIRECT || '/signin'
    })
  );
  router.post(
    '/login',
    validator(schemas.auth.login),
    passport.authenticate('local', { failWithError: true }),
    auth.loginSuccess,
    auth.loginFailure
  );
  return router;
};
