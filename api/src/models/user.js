import uuid from 'uuid';

import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';
import bcrypt from 'bcryptjs';

function findById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne('SELECT * FROM user_account WHERE id = @id', { id })
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function create(user) {
  const token = uuid();
  user = { ...user, token };
  const { columns, values } = Query.toColumns(user);
  return db
    .insert(`INSERT INTO user_account (${columns}) values (${values})`, user)
    .then(findById)
    .catch(err =>
      err.code === '23505'
        ? rejectMessage('Email already in use', k.EMAIL_EXISTS)
        : Promise.reject(err)
    );
}

function update(user) {
  const { id, ...change } = user;
  const mapping = Query.toMapping(change);
  return db
    .query(`UPDATE user_account SET ${mapping} WHERE id = @id`, user)
    .then(() => findById(id));
}

function saltAndHash(password) {
  return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt));
}

function setPassword({ password, token }) {
  const hash = saltAndHash(password);
  const userId = db.selectOne(
    'SELECT * FROM user_account WHERE token = @token',
    { token },
    'id'
  );
  return Promise.all([hash, userId])
    .then(([password, id]) => update({ id, password, token: null }))
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function forgotPassword({ email }) {
  const token = uuid();
  return db
    .selectOne(
      'SELECT * FROM user_account WHERE email = @email',
      { email },
      'id'
    )
    .then(id => update({ id, token }))
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function findByEmail({ email }) {
  return db
    .selectOne('SELECT * FROM user_account WHERE email = @email', { email })
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function validatePassword(user, password) {
  return bcrypt.compare(password, user.password);
}

export default {
  create,
  findById,
  update,
  setPassword,
  forgotPassword,
  findByEmail,
  validatePassword
};
