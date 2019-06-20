import User from '../models/user';
import Professor from '../models/professor';
import { dataHandler, errorHandler, okHandler } from '../utils/handlers';
import { sendVerificationMail } from '../mail';
import uuid from 'uuid';
import * as File from '../utils/file';

function userData(req, res) {
  dataHandler(res)({ loggedIn: !!req.user, user: req.user });
}

function updateUser(req, res) {
  User.update({
    ...req.body,
    id: req.user.id,
    ...(req.body.email && { token: uuid() })
  })
    .then(req.body.email ? sendVerificationMail : Promise.resolve())
    .then(
      () =>
        new Promise((res, rej) =>
          req.login({ ...req.user, ...req.body }, err => {
            if (err) rej(err);
            else res(userData);
          })
        )
    )
    .then(() => dataHandler(res)(req.body))
    .catch(errorHandler(res));
}

function updateProfessor(req, res) {
  Professor.updateOrCreate({ ...req.body, userId: req.user.id })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function updateCv(req, res) {
  const params = {
    Key: `users/${req.user.id}/cv/` + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };
  File.upload(params)
    .then(file =>
      User.update({
        cvLocation: file.Location,
        cvKey: file.Key,
        cvBucket: file.Bucket,
        id: req.user.id
      })
    )
    .then(okHandler(res))
    .catch(errorHandler(res));
}

export default {
  userData,
  updateUser,
  updateProfessor,
  updateCv
};
