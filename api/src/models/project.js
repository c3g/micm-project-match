import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function findById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT *
        FROM project
       WHERE id = @id
      `,
      { id }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Project not found', k.PROJECT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function details(id, userId) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT project.id,
             project.title,
             project.abstract,
             project.open_for_students,
             project.author_id,
             user_account.first_name,
             user_account.last_name,
             user_account.email,
             professor.department
        FROM project
             JOIN user_account
             ON project.author_id = user_account.id
             JOIN professor
             ON project.author_id = professor.user_id
       WHERE project.id = @id
      `,
      { id }
    )
    .then(details =>
      details.authorId == userId ? findById(details.id) : details
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Project not found', k.PROJECT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function create(project) {
  const { columns, values } = Query.toColumns(project);
  return db
    .insert(
      `
      INSERT INTO project (${columns})
      VALUES (${values})
      `,
      project
    )
    .then(findById);
}

function selectAll() {
  return db.selectAll(
    `
    SELECT project.id,
           project.title,
           project.abstract,
           project.author_id,
           user_account.first_name,
           user_account.last_name
      FROM project
           JOIN user_account
           ON project.author_id = user_account.id
    `
  );
}

function listUserProjects(id) {
  return db.selectAll(
    `
    SELECT project.id,
           project.title,
           project.abstract,
           project.author_id
      FROM project
     WHERE project.author_id = @id
    `,
    { id }
  );
}

function search({ term }) {
  return db.selectAll(
    `
    SELECT project.id,
           project.title,
           project.abstract,
           project.author_id,
           user_account.first_name,
           user_account.last_name
      FROM project
           JOIN user_account
           ON project.author_id = user_account.id
     WHERE LOWER(project.title) LIKE LOWER(@term)
           OR LOWER(user_account.first_name) LIKE LOWER(@term)
           OR LOWER(user_account.last_name) LIKE LOWER(@term)
           OR LOWER(project.abstract) LIKE LOWER(@term)
    `,
    { term: `%${term}%` }
  );
}

export default {
  create,
  findById,
  selectAll,
  search,
  details,
  listUserProjects
};
