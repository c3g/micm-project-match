import { createNetworkConstants } from 'Src/utils';

export const REGISTER = createNetworkConstants('REGISTER');
export const LOGIN = createNetworkConstants('LOGIN');
export const SET_PASSWORD = createNetworkConstants('SET_PASSWORD');
export const FORGOT_PASSWORD = createNetworkConstants('FORGOT_PASSWORD');
export const SETUP = createNetworkConstants('SETUP');

export const REGISTER_EMAIL = createNetworkConstants('REGISTER_EMAIL');
export const SETUP_EMAIL = createNetworkConstants('SETUP_EMAIL');

export const LOGOUT = 'LOGOUT';

export const SNACKBAR = {
  INFO: 'SNACKBAR.INFO',
  SUCCESS: 'SNACKBAR.SUCCESS',
  DANGER: 'SNACKBAR.DANGER',
  CLEAR: 'SNACKBAR.CLEAR'
};
