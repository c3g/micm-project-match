import express from 'express';
import validator from '../utils/validator';
import schemas from '../schemas';
import { User, Project, Email } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';

const router = express.Router();

router.get('/users/list', (req, res) => {
  User.listUsers()
    .then(dataHandler(res))
    .catch(errorHandler(res));
});

router.get(
  '/users/:id/make-admin',
  validator(schemas.user.makeAdmin),
  (req, res) => {
    User.makeAdmin(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

router.get(
  '/users/:id/make-professor',
  validator(schemas.user.makeProfessor),
  (req, res) => {
    User.makeProfessor(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

router.get(
  '/users/:id/make-student',
  validator(schemas.user.makeStudent),
  (req, res) => {
    User.makeStudent(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

router.get('/professors/list', (req, res) => {
  User.listProfessors()
    .then(dataHandler(res))
    .catch(errorHandler(res));
});

router.get(
  '/professors/:id/approve',
  validator(schemas.user.approveProfessor),
  (req, res) => {
    User.approveProfessor(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

router.get(
  '/professors/:id/disapprove',
  validator(schemas.user.disapproveProfessor),
  (req, res) => {
    User.disapproveProfessor(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

router.get(
  '/match/:id/approve',
  validator(schemas.project.approveMatch),
  (req, res) => {
    Project.approveMatch(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

router.get(
  '/match/:id/disapprove',
  validator(schemas.project.disapproveMatch),
  (req, res) => {
    Project.disapproveMatch(req.params.id)
      .then(okHandler(res))
      .catch(errorHandler(res));
  }
);

/* Emails */

router.get(
  '/email/list',
  (req, res) => {
    Email.list()
      .then(dataHandler(res))
      .catch(errorHandler(res));
  }
);

router.post(
  '/email/create',
  (req, res) => {
    Email.create(req.body)
      .then(dataHandler(res))
      .catch(errorHandler(res));
  }
);

router.post(
  '/email/update',
  (req, res) => {
    Email.update(req.body)
      .then(dataHandler(res))
      .catch(errorHandler(res));
  }
);

router.post(
  '/email/delete',
  (req, res) => {
    Email.deleteEmail(req.body)
      .then(dataHandler(res))
      .catch(errorHandler(res));
  }
);

export default router;
