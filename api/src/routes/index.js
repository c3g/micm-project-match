import express from 'express';
import validator from '../utils/validator';
import schemas from '../schemas';
import auth from './auth';
import user from './user';
import tag from './tag';
import project from './project';
import application from './application';
import { errorHandler } from '../utils/handlers';
import {
  upload,
  allAccess,
  setupAccess,
  professorAccess,
  adminAccess,
  adminOrProjectCreatorAccess,
  parseBodyData
} from '../utils/express';

const router = express.Router();

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
router.get(
  '/user/:id',
  validator(schemas.user.details),
  setupAccess,
  user.details
);
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
router.get('/cv/:id', validator(schemas.user.getCv), allAccess, user.getCv);

router.get('/user/project/list', setupAccess, project.listUserProjects);
router.post(
  '/project/create',
  upload.array('files'),
  parseBodyData,
  validator(schemas.project.create),
  professorAccess,
  project.create
);
router.get('/project/list', setupAccess, project.list);
router.post(
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
  '/project/update',
  upload.array('files'),
  parseBodyData,
  validator(schemas.project.update),
  setupAccess,
  project.update
);
router.post(
  '/project/:id/delete',
  adminOrProjectCreatorAccess,
  project.deleteProject
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
  adminAccess,
  application.list
);
router.post(
  '/application/create',
  upload.single('transcript'),
  parseBodyData,
  validator(schemas.application.create),
  setupAccess,
  application.create
);
router.post(
  '/application/update',
  upload.single('transcript'),
  parseBodyData,
  validator(schemas.application.update),
  setupAccess,
  application.update
);
router.get(
  '/application/get',
  validator(schemas.application.findByApplicant),
  setupAccess,
  application.findByApplicant
);
router.get(
  '/application/:id/transcript',
  setupAccess,
  application.getTranscript
);
router.get(
  '/application/:id/approve',
  validator(schemas.application.approve),
  professorAccess,
  application.approve
);
router.get(
  '/application/:id/disapprove',
  validator(schemas.application.disapprove),
  professorAccess,
  application.disapprove
);
router.get('/application/applied/list', setupAccess, application.applied);
router.get(
  '/application/claim/:id',
  validator(schemas.application.claim),
  setupAccess,
  application.claim
);

router.get(
  '/document/:id',
  validator(schemas.project.getDocument),
  setupAccess,
  project.getDocument
);
router.get(
  '/document/:id/delete',
  validator(schemas.project.deleteDocument),
  setupAccess,
  project.deleteDocument
);
router.post(
  '/document/create',
  upload.array('files'),
  (req, res, next) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (err) {
      errorHandler(res)(err);
    }
  },
  validator(schemas.project.createDocument),
  setupAccess,
  project.createDocument
);

router.post('/contact', validator(schemas.user.contactUs), user.contactUs);

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
