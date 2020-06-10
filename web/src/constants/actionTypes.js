import { createNetworkConstants, createModelConstants } from 'Src/utils';

export const GOTO = 'GOTO';

export const REGISTER = createNetworkConstants('REGISTER');
export const LOGIN = createNetworkConstants('LOGIN');
export const SET_PASSWORD = createNetworkConstants('SET_PASSWORD');
export const FORGOT_PASSWORD = createNetworkConstants('FORGOT_PASSWORD');
export const SETUP = createNetworkConstants('SETUP');
export const OAUTH_DATA = createNetworkConstants('OAUTH_DATA');
export const REGISTER_EMAIL = createNetworkConstants('REGISTER_EMAIL');
export const LOGOUT = createNetworkConstants('LOGOUT');
export const PROFESSOR_SETUP = createNetworkConstants('PROFESSOR_SETUP');
export const CV_UPLOAD = createNetworkConstants('CV_UPLOAD');
export const VERIFY_EMAIL = createNetworkConstants('VERIFY_EMAIL');
export const PROJECT_SEARCH = createNetworkConstants('PROJECT_SEARCH');
export const APPROVE_APPLICATION = createNetworkConstants(
  'APPROVE_APPLICATION'
);
export const DISAPPROVE_APPLICATION = createNetworkConstants(
  'DISAPPROVE_APPLICATION'
);
export const CLAIM_PROJECT = createNetworkConstants('CLAIM_PROJECT');
export const APPLIED_PROJECTS = createNetworkConstants('APPLIED_PROJECTS');
export const CONTACT_US = createNetworkConstants('CONTACT_US');
export const APPROVE_USER = createNetworkConstants('APPROVE_USER');
export const DISAPPROVE_USER = createNetworkConstants('DISAPPROVE_USER');
export const MATCH_LIST = createNetworkConstants('MATCH_LIST');
export const APPROVE_MATCH = createNetworkConstants('APPROVE_MATCH');
export const DISAPPROVE_MATCH = createNetworkConstants('DISAPPROVE_MATCH');
export const USER_LIST = createNetworkConstants('USER_LIST');
export const MAKE_ADMIN = createNetworkConstants('MAKE_ADMIN');
export const MAKE_PROFESSOR = createNetworkConstants('MAKE_PROFESSOR');
export const MAKE_STUDENT = createNetworkConstants('MAKE_STUDENT');

export const PROJECT = createModelConstants('PROJECT');
export const KEYWORD = createModelConstants('KEYWORD');
export const APPLICATION = createModelConstants('APPLICATION');
export const USER = createModelConstants('USER');
export const USER_PROJECT = createModelConstants('USER_PROJECT');
export const DOCUMENT = createModelConstants('DOCUMENT');
export const EMAIL = createModelConstants('EMAIL');

export const SETUP_REFILL = 'SETUP_REFILL';
export const SETUP_FILLED = 'SETUP_FILLED';
export const KEYWORD_SELECT = 'KEYWORD_SELECT';
export const KEYWORD_DESELECT = 'KEYWORD_DESELECT';
export const KEYWORD_CLEAR = 'KEYWORD_CLEAR';

export const SNACKBAR = {
  SHOW: 'SNACKBAR.SHOW',
  HIDE: 'SNACKBAR.HIDE',
  INFO: 'SNACKBAR.INFO',
  SUCCESS: 'SNACKBAR.SUCCESS',
  DANGER: 'SNACKBAR.DANGER',
  WARNING: 'SNACKBAR.WARNING',
  CLEAR: 'SNACKBAR.CLEAR'
};
