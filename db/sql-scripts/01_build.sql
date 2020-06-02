-- ************************************** types

CREATE TYPE USER_TYPE AS ENUM ('ADMIN', 'PROFESSOR', 'STUDENT', 'UNSET');
CREATE TYPE STRATEGY_TYPE AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK', 'OPENID');
CREATE TYPE EMAIL_TARGET AS ENUM ('INCOMPLETE_USERS');


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
  verified     BOOLEAN DEFAULT false NOT NULL,
  cv_key       VARCHAR(340)
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


-- ************************************** professor

CREATE TABLE IF NOT EXISTS professor (
  id             SERIAL PRIMARY KEY,
  user_id        INT UNIQUE NOT NULL,
  department     VARCHAR(150) NOT NULL,
  position       VARCHAR(150) NOT NULL,
  mila           BOOLEAN DEFAULT FALSE NOT NULL,
  university     VARCHAR(150) NULL,

  FOREIGN KEY (user_id) REFERENCES user_account (id)
);


-- ************************************** project

CREATE TABLE IF NOT EXISTS project (
  id                SERIAL PRIMARY KEY,
  title             VARCHAR(100) NOT NULL,
  start_date        VARCHAR(50) NOT NULL,
  axis              VARCHAR(100) NOT NULL,
  abstract          TEXT NOT NULL,
  description       TEXT NOT NULL,
  datasets          TEXT NOT NULL,
  motive            TEXT NOT NULL,
  timeframe         VARCHAR(20) NOT NULL,
  open_for_students BOOLEAN DEFAULT true NOT NULL,
  organizations     VARCHAR(100)[],
  author_id         INT NOT NULL,
  tag_id            INT[],
  approved     BOOLEAN DEFAULT false NOT NULL,

  FOREIGN KEY (author_id) REFERENCES user_account (id)
);


-- ************************************** project_document

CREATE TABLE IF NOT EXISTS project_document (
  id                SERIAL PRIMARY KEY,
  key               VARCHAR(340),
  name              VARCHAR(261),
  project_id        INT NOT NULL,

  FOREIGN KEY (project_id) REFERENCES project (id)
);


-- ************************************** application

CREATE TABLE IF NOT EXISTS application
(
  id                        SERIAL PRIMARY KEY,
  applicant_id              INT NOT NULL,
  is_mcgill_student         BOOLEAN DEFAULT true NOT NULL,
  university                VARCHAR(100) DEFAULT '' NOT NULL,
  study_program             VARCHAR(100) NOT NULL,
  study_year                VARCHAR(100) NOT NULL,
  graduation_year           INT NOT NULL,
  transcript_key            VARCHAR(340),
  other_internships         BOOLEAN DEFAULT false NOT NULL,
  other_internships_details VARCHAR(200) DEFAULT '' NOT NULL,
  approved                  BOOLEAN DEFAULT false NOT NULL,

  FOREIGN KEY (applicant_id) REFERENCES user_account (id)
);


-- ************************************** tag

CREATE TABLE IF NOT EXISTS tag
(
  id          SERIAL PRIMARY KEY,
  text        VARCHAR(50) UNIQUE NOT NULL
);


-- ************************************** email

CREATE TABLE IF NOT EXISTS email
(
  id         SERIAL PRIMARY KEY,
  target     EMAIL_TARGET NOT NULL,
  author_id  INT NOT NULL,
  send_date  TIMESTAMP NOT NULL,
  title      VARCHAR(100) NOT NULL,
  content    TEXT NOT NULL,
  sent       BOOLEAN DEFAULT false NOT NULL,

  FOREIGN KEY (author_id) REFERENCES user_account (id)
);
