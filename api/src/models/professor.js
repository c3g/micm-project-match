import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function findByUserId(userId) {
  if (!userId) return Promise.resolve(null);
  return db
    .selectOne('SELECT * FROM professor WHERE user_id = @userId', { userId })
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function updateByUserId(professor) {
  const { userId, ...change } = professor;
  const mapping = Query.toMapping(change);
  return db
    .query(
      `UPDATE professor SET ${mapping} WHERE user_id = @userId RETURNING user_id`,
      professor
    )
    .then(res =>
      res.rowCount === 0
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : findByUserId(userId)
    );
}

function create(professor) {
  const { columns, values } = Query.toColumns(professor);
  return db
    .insert(
      `INSERT INTO professor (${columns}) VALUES (${values})`,
      professor,
      'user_id'
    )
    .then(findByUserId);
}

function updateOrCreate(professor) {
  return updateByUserId(professor).catch(err =>
    err.type === k.ACCOUNT_NOT_FOUND ? create(professor) : Promise.reject(err)
  );
}

export default {
  updateOrCreate,
  findByUserId
};
