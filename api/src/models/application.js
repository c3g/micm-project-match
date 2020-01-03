import db from '../database.js';
import { Project } from '.';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function findById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT * FROM application
       WHERE id = @id
      `,
      { id }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Application not found', k.APPLICATION_NOT_FOUND)
        : Promise.reject(err)
    );
}

function findByApplicant(applicantId) {
  return db
    .selectOne(
      `
      SELECT *
        FROM application
       WHERE applicant_id = @applicantId
      `,
      { applicantId }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Application not found', k.APPLICATION_NOT_FOUND)
        : Promise.reject(err)
    );
}

function list() {
  return db.selectAll(
    `
    SELECT row_to_json(application.*) AS "application",
           row_to_json(user_account.*) AS "user"
      FROM application
      JOIN user_account ON application.applicant_id = user_account.id
    `
  );
}

function create(application) {
  const { columns, values } = Query.toColumns(application);
  return db
    .insert(
      `
      INSERT INTO application (${columns})
      VALUES (${values})
      `,
      application,
      'id'
    )
    .then(findById);
}

function update(application) {
  const { id, ...change } = application;
  const mapping = Query.toMapping(change);
  return db
    .insert(
      `
      UPDATE application
         SET ${mapping}
       WHERE id = @id
             AND applicant_id = @applicantId
      `,
      application,
      'id'
    )
    .then(findById);
}

function approve(id, userId) {
  return db.query(`
    UPDATE application
        SET approved = true
      WHERE id = @id
    `,
    { id }
  )
}

function disapprove(id, userId) {
  return db.query(
    `
    UPDATE application
        SET approved = false
      WHERE id = @id
    `,
    { id }
  );
}

export default {
  create,
  findById,
  findByApplicant,
  update,
  list,
  approve,
  disapprove
};
