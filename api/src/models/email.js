/*
 * email.js
 */

import db from '../database.js';
import * as Query from '../utils/query';
import { sendScheduledEmailsTick } from '../mail'

function findById(id) {
  return db
    .selectOne(
      `
      SELECT e.*
           , row_to_json(u.*) AS "author"
        FROM email e
        JOIN user_account u ON u.id = e.author_id
       WHERE e.id = @id
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
    .then(id => {
      sendScheduledEmailsTick().then(() => {}, console.error);
      return findById(id);
    });
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

function deleteEmail(email) {
  return db.query(`DELETE FROM email WHERE id = @id`, email).then(() => email);
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
