import { User } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';
import { sendVerificationMail } from '../mail';
import k from '../constants';

function register(req, res) {
  User.create(req.body.userData)
    .then(sendVerificationMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function setPassword(req, res) {
  User.setPassword(req.body)
    .then(okHandler(res))
    .catch(errorHandler(res));
}

function forgotPassword(req, res) {
  User.forgotPassword(req.body)
    .then(sendVerificationMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function registerResend(req, res) {
  User.findByEmail(req.params)
    .then(sendVerificationMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function loginSuccess(req, res) {
  const { password, token, ...userDetails } = req.user;
  dataHandler(res)(userDetails);
}

function loginFailure(err, req, res, next) {
  if (err.status === 401) {
    const err = new Error('Email or password is incorrect');
    err.type = k.INCORRECT_CREDENTIALS;
    return errorHandler(res)(err);
  }
  errorHandler(res)(err);
}

export default {
  register,
  setPassword,
  forgotPassword,
  registerResend,
  loginSuccess,
  loginFailure
};
