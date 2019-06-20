import pool from './config/db';
import { rejectMessage } from './utils/promise';
import k from './constants';
import { camel } from 'change-case';

/**
 * Turns 'SELECT * FROM users WHERE id = @id', { id: 42 }
 * into  'SELECT * FROM users WHERE id = $1',  [ 42 ]
 * for usage with postgres module.
 */
function interpolate(query, params) {
  if (!params) return { query: query, params: [] };

  let index = 1;
  const variables = {};

  const newQuery = query.replace(/@(\w+)/g, (m, name) => {
    if (!(name in params))
      throw new Error(
        `Missing parameter "${name}" \nin "${query}" \nwith: ${JSON.stringify(
          params
        )}`
      );

    if (!(name in variables))
      variables[name] = { index: index++, value: params[name] };

    return '$' + variables[name].index;
  });

  const newParams = Object.values(variables)
    .sort((a, b) => a.index - b.index)
    .map(v => v.value);

  return { query: newQuery, params: newParams };
}

/**
 * Perform a query using the pool/request's app's pool
 * @returns Promise
 */
function query(q, params, conn = pool) {
  return new Promise((resolve, reject) => {
    const interpolated = interpolate(q, params);

    conn.query(interpolated.query, interpolated.params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

function correctCase(object) {
  return Object.keys(object).reduce(
    (a, c) => ({ ...a, [camel(c)]: object[c] }),
    {}
  );
}

function selectOne(q, params, field) {
  return query(q, params).then(result =>
    result.rows.length === 0
      ? rejectMessage(
          `Couldnt find record in query ${q} with params ${JSON.stringify(
            params
          )}`,
          k.ROW_NOT_FOUND
        )
      : field
      ? correctCase(result.rows[0])[field]
      : correctCase(result.rows[0])
  );
}

function selectAll(q, params, field) {
  return query(q, params).then(result =>
    field ? result.rows.map(r => r[field]) : result.rows.map(correctCase)
  );
}

function insert(q, params, field = 'id', conn) {
  return query(q + ` RETURNING ${field}`, params, conn).then(result =>
    result.rows.length > 0 ? result.rows[0][field] : undefined
  );
}

const NOW = `to_char (now()::timestamp at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')::timestamp`;

export default {
  pool,
  query,
  selectOne,
  selectAll,
  insert,
  NOW
};
