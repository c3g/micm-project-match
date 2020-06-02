import uuid from 'uuid';

import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';
import bcrypt from 'bcryptjs';

function findById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT *
        FROM user_account
       WHERE id = @id
      `,
      { id }
    )
    .then(user => {
      delete user.password
      return user
    })
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function findProfessorById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT user_account.*,
             row_to_json(professor.*) AS "professor",
             (SELECT COUNT(*) FROM project WHERE author_id = @id) AS "project_count"
        FROM user_account
             LEFT JOIN professor
             ON user_account.id = professor.user_id
       WHERE user_account.id = @id
      `,
      { id }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function create(user) {
  const token = uuid();
  user = { ...user, token };
  const { columns, values } = Query.toColumns(user);
  return db
    .insert(
      `
      INSERT INTO user_account (${columns})
      VALUES (${values})
      `,
      user
    )
    .then(findById)
    .catch(err =>
      err.code === k.POSTGRES_UNIQUE_VIOLATION
        ? rejectMessage('Email already in use', k.EMAIL_EXISTS)
        : Promise.reject(err)
    );
}

function update(user) {
  const { id, ...change } = user;
  const mapping = Query.toMapping(change);
  return db
    .query(
      `
      UPDATE user_account
         SET ${mapping}
       WHERE id = @id
      `,
      user
    )
    .then(() => findProfessorById(id))
    .catch(err =>
      err.code === k.POSTGRES_UNIQUE_VIOLATION
        ? rejectMessage('Email already in use', k.EMAIL_EXISTS)
        : Promise.reject(err)
    );
}

function saltAndHash(password) {
  return bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt));
}

function setPassword({ password, token }) {
  const hash = saltAndHash(password);
  const userId = db.selectOne(
    `
    SELECT *
      FROM user_account
     WHERE token = @token
       AND strategy = @strategy
    `,
    { token, strategy: k.STRATEGY.LOCAL },
    'id'
  );
  return Promise.all([hash, userId])
    .then(([password, id]) =>
      update({ id, password, token: null, verified: true })
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function forgotPassword({ email }) {
  const token = uuid();
  return db
    .selectOne(
      `
      SELECT *
        FROM user_account
       WHERE email = @email
      `,
      { email },
      'id'
    )
    .then(id => update({ id, token }))
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function findByEmail({ email }) {
  return db
    .selectOne(
      `
      SELECT *
        FROM user_account
       WHERE email = @email
      `,
      { email }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function validatePassword(user, password) {
  return bcrypt.compare(password, user.password);
}

function findByIdentifier(identifier, strategy) {
  return db
    .selectOne(
      `
      SELECT user_account.*,
             row_to_json(oauth_details.*) AS "oauthDetails"
        FROM user_account
             JOIN oauth_details
             ON user_account.id = oauth_details.user_id
       WHERE oauth_details.identifier = @identifier
       ${
         strategy
           ? `
         AND user_account.strategy = @strategy
           `
           : ''
       }`,
      { identifier, strategy }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('User account not found', k.ACCOUNT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function createOAuth(profile, strategy) {
  return db.pool
    .connect()
    .then(client =>
      client
        .query('BEGIN')
        .then(() =>
          db.insert(
            `
            INSERT INTO user_account(strategy)
            VALUES (@strategy)
            `,
            { strategy },
            'id',
            client
          )
        )
        .then(id => {
          const user = {
            identifier: profile.id,
            firstName: profile.name && profile.name.givenName,
            lastName: profile.name && profile.name.familyName,
            email:
              profile.emails && profile.emails[0] && profile.emails[0].value,
            userId: id
          };
          const { columns, values } = Query.toColumns(user);
          return db.insert(
            `
            INSERT INTO oauth_details (${columns})
            VALUES (${values})
            `,
            user,
            'identifier',
            client
          );
        })
        .then(identifier => client.query('COMMIT').then(() => identifier))
        .catch(err => client.query('ROLLBACK').then(() => Promise.reject(err)))
        .finally(() => client.release())
    )
    .then(identifier => findByIdentifier(identifier, strategy));
}

function getOAuthData(userId) {
  return db.selectOne(
    `
    SELECT *
      FROM oauth_details
     WHERE user_id = @userId
    `,
    {
      userId
    }
  );
}

function verifyEmail(token) {
  return db.query(
    `
    UPDATE user_account
       SET verified = true,
           token = null
     WHERE token = @token
    `,
    { token }
  );
}

function listProfessors() {
  return db.selectAll(`
    SELECT first_name,
           last_name,
           approved,
           id
      FROM user_account
     WHERE type = 'PROFESSOR'
  `);
}

function unapprovedCount() {
  return db.selectOne(`
    SELECT COUNT(*)
      FROM user_account
     WHERE approved = false
  `);
}

function listAdmins() {
  return db.selectAll(`
    SELECT first_name,
           last_name,
           email
      FROM user_account
     WHERE type = 'ADMIN'
  `);
}

function approveProfessor(id) {
  return db.query(
    `
    UPDATE user_account
       SET approved = true
     WHERE id = @id
    `,
    { id }
  );
}

function disapproveProfessor(id) {
  return db.query(
    `
    UPDATE user_account
       SET approved = false
     WHERE id = @id
    `,
    { id }
  );
}

function makeAdmin(id) {
  return db.query(
    `
    UPDATE user_account
       SET type = 'ADMIN'
     WHERE id = @id
    `,
    { id }
  );
}

function makeProfessor(id) {
  return db.query(
    `
    UPDATE user_account
       SET type = 'PROFESSOR'
     WHERE id = @id
    `,
    { id }
  );
}

function makeStudent(id) {
  return db.query(
    `
    UPDATE user_account
       SET type = 'STUDENT'
     WHERE id = @id
    `,
    { id }
  );
}

function listUsers() {
  return db.selectAll(`
    SELECT first_name,
           last_name,
           type,
           approved,
           id
      FROM user_account
     WHERE user_account.type != 'UNSET'
  `);
}

function listIncompleteStudents() {
  return db.selectAll(`
       SELECT u.*
         FROM user_account u
    LEFT JOIN application a ON a.applicant_id = u.id
        WHERE u.type = 'STUDENT'
          AND a.id IS NULL
  `)
  .then(users => {
    users.forEach(user => { delete user.password })
    return users
  });
}

function listIncompleteProfessors() {
  return db.selectAll(`
       SELECT u.*
            , (SELECT COUNT(*) FROM project p WHERE p.author_id = u.id) as project_count
         FROM user_account u
        WHERE u.type = 'PROFESSOR'
          AND (SELECT COUNT(*) FROM project p WHERE p.author_id = u.id) = 0
  `)
  .then(users => {
    users.forEach(user => { delete user.password })
    return users
  });
}

function listIncompleteUsers() {
  return Promise.all([
    listIncompleteStudents(),
    listIncompleteProfessors(),
  ])
  .then(([students, professors]) => [...students, ...professors]);
}

export default {
  create,
  findById,
  update,
  setPassword,
  forgotPassword,
  findByEmail,
  validatePassword,
  findByIdentifier,
  createOAuth,
  getOAuthData,
  verifyEmail,
  findProfessorById,
  listProfessors,
  approveProfessor,
  disapproveProfessor,
  unapprovedCount,
  listAdmins,
  listUsers,
  makeProfessor,
  makeAdmin,
  makeStudent,
  listIncompleteUsers,
};
