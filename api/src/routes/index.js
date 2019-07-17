import express from 'express';
import validator from '../utils/validator';
import schemas from '../schemas';
import multer from 'multer';
import auth from './auth';
import user from './user';
import tag from './tag';
import project from './project';
import application from './application';
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
const setupAccess = isAuthenticated([
  k.USER_TYPE.PROFESSOR,
  k.USER_TYPE.STUDENT,
  k.USER_TYPE.ADMIN
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
router.get(
  '/user/:id',
  validator(schemas.user.details),
  setupAccess,
  user.details
);
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

router.get('/user/project/list', professorAccess, project.listUserProjects);
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
router.post(
  '/project/update',
  upload.array('files'),
  (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (err) {
      errorHandler(res)(err);
    }
  },
  validator(schemas.project.update),
  professorAccess,
  project.update
);
router.get('/project/list', setupAccess, project.list);
router.get(
  '/project/search',
  validator(schemas.project.search),
  setupAccess,
  project.search
);
router.get(
  '/project/:id',
  validator(schemas.project.details),
  setupAccess,
  project.details
);

router.post(
  '/tag/create',
  validator(schemas.tag.create),
  setupAccess,
  tag.create
);
router.get(
  '/tag/search',
  validator(schemas.tag.search),
  setupAccess,
  tag.search
);

router.get(
  '/application/list',
  professorAccess,
  application.selectApplications
);
router.post(
  '/application/create',
  validator(schemas.application.create),
  setupAccess,
  application.create
);
router.post(
  '/application/update',
  validator(schemas.application.update),
  setupAccess,
  application.update
);
router.get(
  '/application/:projectId/project',
  validator(schemas.application.findByApplicantProject),
  setupAccess,
  application.findByApplicantProject
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
