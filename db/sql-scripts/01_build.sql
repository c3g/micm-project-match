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
  verified     BOOLEAN DEFAULT false NOT NULL,
  cv_location  VARCHAR(400),
  cv_key       VARCHAR(340),
  cv_bucket    VARCHAR(64)
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
  chosen_id         INT,
  tag_id            INT[],

  FOREIGN KEY (author_id) REFERENCES user_account (id),
  FOREIGN KEY (chosen_id) REFERENCES user_account (id)
);


-- ************************************** project_document

CREATE TABLE IF NOT EXISTS project_document (
  id                SERIAL PRIMARY KEY,
  location          VARCHAR(400),
  key               VARCHAR(340),
  bucket            VARCHAR(64),
  project_id        INT NOT NULL,

  FOREIGN KEY (project_id) REFERENCES project (id)
);


-- ************************************** application

CREATE TABLE IF NOT EXISTS application
(
  id            SERIAL PRIMARY KEY,
  applicant_id  INT NOT NULL,
  project_id    INT NOT NULL,
  proposal      TEXT NOT NULL,
  approved      BOOLEAN DEFAULT false NULL,

  FOREIGN KEY (applicant_id) REFERENCES user_account (id),
  FOREIGN KEY (project_id) REFERENCES project (id)
);


-- ************************************** tag

CREATE TABLE IF NOT EXISTS tag
(
  id          SERIAL PRIMARY KEY,
  text        VARCHAR(50) NOT NULL
);
