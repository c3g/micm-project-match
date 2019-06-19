-- ************************************** types

CREATE TYPE USER_TYPE AS ENUM ('ADMIN', 'PROFESSOR', 'STUDENT', 'UNSET');
CREATE TYPE STRATEGY_TYPE AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK', 'OPENID');


-- ************************************** user

CREATE TABLE IF NOT EXISTS user_account (
  id           SERIAL PRIMARY KEY,
  first_name   VARCHAR(50),
  last_name    VARCHAR(50),
  tel          VARCHAR(20),
  email        VARCHAR(100) UNIQUE,
  password     VARCHAR(61),
  type         USER_TYPE DEFAULT 'UNSET' NOT NULL,
  token        VARCHAR(100) UNIQUE,
  strategy     STRATEGY_TYPE DEFAULT 'LOCAL' NOT NULL,
  approved     BOOLEAN DEFAULT false NOT NULL,
  verified     BOOLEAN DEFAULT false NOT NULL
);


-- ************************************** oauth_details

CREATE TABLE IF NOT EXISTS oauth_details (
  id           SERIAL PRIMARY KEY,
  identifier   VARCHAR(100) NOT NULL,
  first_name   VARCHAR(50),
  last_name    VARCHAR(50),
  email        VARCHAR(100),
  user_id      INT NOT NULL,

  FOREIGN KEY (user_id) REFERENCES user_account (id)
);


-- ************************************** department

-- CREATE TABLE IF NOT EXISTS department (
--   id   SERIAL PRIMARY KEY,
--   name VARCHAR(150) NOT NULL
-- );


-- ************************************** position

-- CREATE TABLE IF NOT EXISTS position (
--   id   SERIAL PRIMARY KEY,
--   name VARCHAR(150) NOT NULL
-- );


-- ************************************** professor

CREATE TABLE IF NOT EXISTS professor_details (
  id             SERIAL PRIMARY KEY,
  user_id        INT NOT NULL,
  department     VARCHAR(150) NOT NULL,
  position       VARCHAR(150) NOT NULL,

  FOREIGN KEY (user_id)       REFERENCES user_account (id)
  -- FOREIGN KEY (department_id) REFERENCES department (id),
  -- FOREIGN KEY (position_id)   REFERENCES position (id)
);


-- ************************************** project

CREATE TABLE IF NOT EXISTS project (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  min_students INT NOT NULL,
  max_students INT,
  description  TEXT NOT NULL,
  author_id    INT NOT NULL,
  visibility   INT NOT NULL,
  slug         VARCHAR(30) NOT NULL,
  tag_id       INT[],

  FOREIGN KEY (author_id) REFERENCES user_account (id)
);


-- ************************************** document

CREATE TABLE IF NOT EXISTS document
(
  id       SERIAL PRIMARY KEY,
  location VARCHAR(255) NOT NULL,
  user_id  INT NOT NULL,

  FOREIGN KEY (user_id) REFERENCES user_account (id)
);


-- ************************************** application

CREATE TABLE IF NOT EXISTS application
(
  id         SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  project_id INT NOT NULL,
  proposal   TEXT NOT NULL,
  accepted   INT NOT NULL,

  FOREIGN KEY (student_id) REFERENCES user_account (id),
  FOREIGN KEY (project_id) REFERENCES project (id)
);


-- ************************************** tag

CREATE TABLE IF NOT EXISTS tag
(
  id          SERIAL PRIMARY KEY,
  text        VARCHAR(50) NOT NULL,
  project_id   INT[]
);


-- ************************************** application_document

CREATE TABLE IF NOT EXISTS application_document
(
  id             SERIAL PRIMARY KEY,
  application_id INT NOT NULL,
  document_id    INT NOT NULL,
  title          VARCHAR(100),

  FOREIGN KEY (application_id) REFERENCES application (id),
  FOREIGN KEY (document_id) REFERENCES document (id)
);


-- ************************************** project_document

CREATE TABLE IF NOT EXISTS project_document
(
  id          SERIAL PRIMARY KEY,
  project_id  INT NOT NULL,
  document_id INT NOT NULL,
  title       VARCHAR(100) NOT NULL,

  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (document_id) REFERENCES document (id)
);


