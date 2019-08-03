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
        FROM tag
       WHERE id = @id
      `,
      { id }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Tag not found', k.TAG_NOT_FOUND)
        : Promise.reject(err)
    );
}

function findByText({ text }) {
  if (!text) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT *
        FROM tag
       WHERE text = @text
      `,
      { text }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Tag not found', k.TAG_NOT_FOUND)
        : Promise.reject(err)
    );
}

function create(tag) {
  const { columns, values } = Query.toColumns(tag);
  return db
    .insert(
      `
      INSERT INTO tag (${columns})
      VALUES (${values})
      `,
      tag
    )
    .then(findById)
    .catch(err =>
      err.code === k.POSTGRES_UNIQUE_VIOLATION
        ? findByText(tag)
        : Promise.reject(err)
    );
}

function search({ term }) {
  return db.selectAll(
    `
      SELECT id,
             text
        FROM tag
       WHERE LOWER(text) LIKE LOWER(@term)
      `,
    { term: `%${term}%` }
  );
}

export default {
  create,
  search
};
