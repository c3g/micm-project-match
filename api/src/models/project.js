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
             array_agg(tag.text) as tags,
             COALESCE(
               json_agg(
                 json_build_object(
                   'id', project_document.id,
                   'name', project_document.name
                 )
               )
               FILTER (
                 WHERE project_document.id IS NOT NULL
                 AND project_document.name IS NOT NULL
               ),
               '[]'
             ) as documents
        FROM project
             LEFT JOIN tag
             ON tag.id = ANY(project.tag_id)
             LEFT JOIN project_document
             ON project.id = project_document.project_id
       GROUP BY project.id
      HAVING project.id = @id
      `,
      { id }
    )
    .then(data => ({
      ...data,
      documents: Array.from(
        new Set(data.documents.map(document => document.id))
      ).map(id => data.documents.find(document => document.id === id)),
      tags: Array.from(new Set(data.tags))
    }))
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
             LEFT JOIN tag
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
           LEFT JOIN tag
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

function search({ term, keywords }) {
  console.log(keywords);
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
           LEFT JOIN tag
           ON tag.id = ANY(project.tag_id)
     GROUP BY project.id,
           user_account.first_name,
           user_account.last_name
    HAVING LOWER(project.title) LIKE LOWER(@term)
           AND project.tag_id @> @keywords
    `,
    { term: `%${term}%`, keywords }
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

function addDocument(document, id, name) {
  const data = {
    location: document.Location,
    key: document.Key,
    bucket: document.Bucket,
    projectId: id,
    name
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

function projectId(id, userId) {
  return db
    .selectOne(
      `
    SELECT project.id
      FROM project
           LEFT JOIN project_document
           ON project.id = project_document.project_id
     WHERE project_document.id = @id
           AND project.author_id = @userId
    `,
      { id, userId }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Project not found', k.PROJECT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function deleteDocument(id, userId) {
  return projectId(id, userId).then(() =>
    db.query(
      `
        DELETE
          FROM project_document
         WHERE id = @id
     RETURNING project_document.key as Key
      `,
      { id }
    )
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
  addDocument,
  deleteDocument
};
