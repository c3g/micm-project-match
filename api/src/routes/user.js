import User from '../models/user';
import { dataHandler, errorHandler } from '../utils/handlers';
import { sendVerificationMail } from '../mail';
import uuid from 'uuid';

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

export default {
  userData,
  updateUser
};
