import express from 'express';
import { pick } from 'ramda';
import validator from '../utils/validator';
import schemas from '../schemas';
import { User } from '../models';
import { Professor } from '../models';
import { dataHandler, errorHandler } from '../utils/handlers';
import { sendVerificationMail } from '../mail';
import uuid from 'uuid';
import * as File from '../utils/file';
import { clean } from '../config/passport';
import {
  upload,
  allAccess,
  setupAccess,
  professorAccess
} from '../utils/express';

const router = express.Router();

const pickUpdatableProps = pick([
  'id',
  'firstName',
  'lastName',
  'password',
  'tel',
  'email',
  'password',
  'type',
  'token',
  'strategy',
  'approved',
  'verified',
  'cvKey'
]);

router.get('/', (req, res) => {
  if (!req.user) return dataHandler(res)({ loggedIn: false, user: null });

  User.findProfessorById(req.user.id)
    .then(user => {
      return { loggedIn: true, user };
    })
    .then(dataHandler(res))
    .catch(errorHandler(res));
});

router.get('/oauth', allAccess, (req, res) => {
  User.getOAuthData(req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
});

router.get('/:id', validator(schemas.user.details), setupAccess, (req, res) => {
  User.findProfessorById(req.params.id)
    .then(data => dataHandler(res)(clean(data)))
    .catch(errorHandler(res));
});

router.post(
  '/update',
  validator(schemas.user.updateUser),
  allAccess,
  (req, res) => {
    const { email, professor, ...userData } = req.body;
    const emailShouldUpdate = email && !req.user.verified;

    const updateData = {
      id: req.user.id,
      ...pickUpdatableProps(userData)
    };

    if (emailShouldUpdate) {
      updateData.email = email;
      updateData.token = uuid();
    }

    User.update(updateData)
      .then(emailShouldUpdate ? sendVerificationMail : Promise.resolve())
      .then(() =>
        professor
          ? Professor.updateOrCreate({ ...professor, userId: req.user.id })
          : Promise.resolve()
      )
      .then(
        user =>
          new Promise((res, rej) =>
            req.login(clean(user), err => {
              if (err) rej(err);
              else res(clean(user));
            })
          )
      )
      .then(() => User.findProfessorById(userData.id))
      .then(dataHandler(res))
      .catch(errorHandler(res));
  }
);

router.post(
  '/professor/update',
  validator(schemas.user.updateProfessor),
  professorAccess,
  (req, res) => {
    Professor.updateOrCreate({ ...req.body, userId: req.user.id })
      .then(dataHandler(res))
      .catch(errorHandler(res));
  }
);

router.post('/cv/update', upload.single('cv'), allAccess, (req, res) => {
  const { file, user } = req;
  const { id } = user;
  const location = `users/${id}/cv/${file.originalname || 'file'}`;

  return File.checkSize(file, 8)
    .then(() => File.upload(location, file.mimetype, file.buffer))
    .then(() =>
      User.update({
        id: user.id,
        cvKey: location
      })
    )
    .then(dataHandler(res))
    .catch(errorHandler(res));
});

router.get('/cv/:id', validator(schemas.user.getCv), allAccess, (req, res) => {
  User.findById(req.params.id)
    .then(user => File.getFileLocation(user.cvKey))
    .then(filepath => {
      res.download(filepath);
    })
    .catch(errorHandler(res));
});

export default router;
