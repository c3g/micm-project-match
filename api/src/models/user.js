import uuid from 'uuid';

import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function findById(id) {
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
    .catch(err => {
      switch (err.code) {
        case '23505':
          return rejectMessage('Email already in use', k.EMAIL_EXISTS);
        default:
          return Promise.reject(err);
      }
    });
}

function update(user) {
  const { id, ...change } = user;
  const mapping = Query.toMapping(change);
  return db
    .query(`UPDATE user_account SET ${mapping} WHERE id = @id`, user)
    .then(() => findById(id));
}

function setPassword({ password, token }) {
  return db
    .selectOne(
      'SELECT * FROM user_account WHERE token = @token',
      { token },
      'id'
    )
    .then(id => update({ id, password, token: null }))
    .catch(err => {
      switch (err.type) {
        case k.ROW_NOT_FOUND:
          return rejectMessage('Account not found', k.ACCOUNT_NOT_FOUND);
        default:
          return Promise.reject(err);
      }
    });
}

export default {
  create,
  findById,
  update,
  setPassword
};
