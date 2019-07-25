import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function findById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT project.*,
             array_agg(tag.text) as tags
        FROM project
             JOIN tag
             ON tag.id = ANY(project.tag_id)
       GROUP BY project.id
      HAVING project.id = @id
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
             professor.department,
             array_agg(tag.text) as tags
        FROM project
             JOIN user_account
             ON project.author_id = user_account.id
             JOIN professor
             ON project.author_id = professor.user_id
             JOIN tag
             ON tag.id = ANY(project.tag_id)
       GROUP BY project.id,
             user_account.first_name,
             user_account.last_name,
             user_account.email,
             professor.department
      HAVING project.id = @id
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
           user_account.last_name,
           array_agg(tag.text) as tags
      FROM project
           JOIN user_account
           ON project.author_id = user_account.id
           JOIN tag
           ON tag.id = ANY(project.tag_id)
     GROUP BY project.id,
           user_account.first_name,
           user_account.last_name
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
           user_account.last_name,
           array_agg(tag.text) as tags
      FROM project
           JOIN user_account
           ON project.author_id = user_account.id
           JOIN tag
           ON tag.id = ANY(project.tag_id)
     GROUP BY project.id,
           user_account.first_name,
           user_account.last_name
    HAVING LOWER(project.title) LIKE LOWER(@term)
    `,
    { term: `%${term}%` }
  );
}

function update(project) {
  const { id, authorId, ...change } = project;
  const mapping = Query.toMapping(change);
  return db
    .query(
      `
      UPDATE project
         SET ${mapping}
       WHERE author_id = @authorId
             AND id = @id
   RETURNING id
    `,
      project
    )
    .then(res =>
      res.rowCount === 0
        ? rejectMessage('Project not found', k.PROJECT_NOT_FOUND)
        : findById(id)
    );
}

function addDocument(document, id) {
  const data = {
    location: document.Location,
    key: document.Key,
    bucket: document.Bucket,
    projectId: id
  };
  const { columns, values } = Query.toColumns(data);
  return db.insert(
    `
      INSERT INTO project_document (${columns})
      VALUES (${values})
      `,
    data
  );
}

export default {
  create,
  findById,
  selectAll,
  search,
  details,
  listUserProjects,
  update,
  addDocument
};
