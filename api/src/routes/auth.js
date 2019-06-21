import { User } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';
import { sendSetPasswordMail } from '../mail';
import k from '../constants';

function register(req, res) {
  User.create(req.body.userData)
    .then(sendSetPasswordMail)
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
    .then(sendSetPasswordMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function registerResend(req, res) {
  User.findByEmail(req.params)
    .then(sendSetPasswordMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function loginSuccess(req, res) {
  const { password, token, ...userDetails } = req.user;
  dataHandler(res)(userDetails);
}

function loginFailure(err, req, res, next) {
  if (err.status === k.UNAUTHORIZED_STATUS) {
    const err = new Error('Email or password is incorrect');
    err.type = k.INCORRECT_CREDENTIALS;
    return errorHandler(res)(err);
  }
  errorHandler(res)(err);
}

function logout(req, res) {
  req.logout();
  okHandler(res)();
}

function verifyEmail(req, res) {
  User.verifyEmail(req.params.token)
    .then(okHandler(res))
    .then(errorHandler(res));
}

export default {
  register,
  setPassword,
  forgotPassword,
  registerResend,
  loginSuccess,
  loginFailure,
  logout,
  verifyEmail
};
