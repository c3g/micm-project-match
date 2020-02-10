/*
 * email.js
 */

import db from '../database.js';
import * as Query from '../utils/query';

function findById(id) {
  return db
    .selectOne(
      `
      SELECT email.*
           , row_to_json(user_account.*) AS "author"
        FROM email
        JOIN user_account u ON u.id = e.author_id
       WHERE id = @id
      `,
      { id }
    );
}

function create(email) {
  const { columns, values } = Query.toColumns(email);
  return db
    .insert(
      `
      INSERT INTO email (${columns})
      VALUES (${values})
      `,
      email
    )
    .then(findById);
}

function update(email) {
  const { id, ...change } = email;
  const mapping = Query.toMapping(change);
  return db
    .query(
      `
      UPDATE email
         SET ${mapping}
       WHERE id = @id
      `,
      email
    )
    .then(() => findById(id));
}

function list() {
  return db.selectAll(`
    SELECT e.*
         , row_to_json(u.*) AS "author"
      FROM email e
      JOIN user_account u ON u.id = e.author_id
  `);
}

function listOverdue() {
  return db.selectAll(`
    SELECT e.*
         , row_to_json(u.*) AS "author"
      FROM email e
      JOIN user_account u ON u.id = e.author_id
     WHERE e.send_date < current_timestamp
       AND e.sent = false
  `);
}

function markAsSent(email) {
  return db.query(
    `
     UPDATE email
        SET sent = true
      WHERE id = @id
    `,
    email
  )
  .then(() => findById(email.id));
}

function deleteEmail(id) {
  return db.query(`DELETE FROM email WHERE id = @id`, id);
}

export default {
  findById,
  create,
  update,
  list,
  listOverdue,
  markAsSent,
  deleteEmail,
};
