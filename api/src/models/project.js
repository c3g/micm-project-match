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

export default {
  create,
  findById
};
