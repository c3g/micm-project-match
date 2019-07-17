import db from '../database.js';
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

function findByApplicantProject({ projectId, applicantId }) {
  return db
    .selectOne(
      `
      SELECT * FROM application
       WHERE project_id = @projectId
             AND applicant_id = @applicantId
      `,
      { projectId, applicantId }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Application not found', k.APPLICATION_NOT_FOUND)
        : Promise.reject(err)
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
  return db
    .insert(
      `
      UPDATE application
         SET proposal = @proposal
       WHERE id = @applicationId
             AND applicant_id = @applicantId
      `,
      application,
      'id'
    )
    .then(findById);
}

function selectApplications(userId) {
  return db.selectAll(
    `
    SELECT row_to_json(application.*) AS "application",
           user_account.first_name,
           user_account.last_name,
           project.title AS "projectTitle"
      FROM application
           JOIN user_account
           ON application.applicant_id = user_account.id
           JOIN project
           ON application.project_id = project.id
     WHERE project.author_id = @userId
    `,
    { userId }
  );
}

function pass(id, userId) {
  // TODO finish pass function
  return { id, userId };
}

export default {
  create,
  findById,
  findByApplicantProject,
  update,
  selectApplications,
  pass
};
