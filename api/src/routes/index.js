import express from 'express';
import validator from '../utils/validator';
import schemas from '../schemas';
import auth from './auth';
import project from './project';
import application from './application';
import { okHandler, errorHandler } from '../utils/handlers';
import { sendContactUsMail } from '../mail';
import {
  upload,
  access,
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

router.get('/project/list-from-user', access.setup, project.listUserProjects);
router.post(
  '/project/create',
  upload.array('files'),
  parseBodyData,
  validator(schemas.project.create),
  access.setup,
  project.create
);
router.get('/project/list', access.setup, project.list);
router.post(
  '/project/search',
  validator(schemas.project.search),
  access.setup,
  project.search
);
router.get(
  '/project/:id',
  validator(schemas.project.details),
  access.setup,
  project.details
);
router.post(
  '/project/update',
  upload.array('files'),
  parseBodyData,
  validator(schemas.project.update),
  access.setup,
  project.update
);
router.post(
  '/project/:id/delete',
  access.adminOrProjectCreator,
  project.deleteProject
);

router.get('/application/list', access.admin, application.list);
router.post(
  '/application/create',
  upload.single('transcript'),
  parseBodyData,
  validator(schemas.application.create),
  access.setup,
  application.create
);
router.post(
  '/application/update',
  upload.single('transcript'),
  parseBodyData,
  validator(schemas.application.update),
  access.setup,
  application.update
);
router.get(
  '/application/get',
  validator(schemas.application.findByApplicant),
  access.setup,
  application.findByApplicant
);
router.get(
  '/application/:id/transcript',
  access.setup,
  application.getTranscript
);
router.get(
  '/application/:id/approve',
  validator(schemas.application.approve),
  access.professor,
  application.approve
);
router.get(
  '/application/:id/disapprove',
  validator(schemas.application.disapprove),
  access.professor,
  application.disapprove
);
router.get('/application/applied/list', access.setup, application.applied);
router.get(
  '/application/claim/:id',
  validator(schemas.application.claim),
  access.setup,
  application.claim
);

router.get(
  '/document/:id',
  validator(schemas.project.getDocument),
  access.setup,
  project.getDocument
);
router.get(
  '/document/:id/delete',
  validator(schemas.project.deleteDocument),
  access.setup,
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
  access.setup,
  project.createDocument
);

router.post('/contact', validator(schemas.user.contactUs), (req, res) => {
  sendContactUsMail(req.body).then(okHandler(res));
});

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
