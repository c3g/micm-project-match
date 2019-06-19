import { createNetworkConstants } from 'Src/utils';

export const REGISTER = createNetworkConstants('REGISTER');
export const LOGIN = createNetworkConstants('LOGIN');
export const SET_PASSWORD = createNetworkConstants('SET_PASSWORD');
export const FORGOT_PASSWORD = createNetworkConstants('FORGOT_PASSWORD');
export const REGISTER_EMAIL = createNetworkConstants('REGISTER_EMAIL');

export const SNACKBAR = {
  INFO: 'SNACKBAR.INFO',
  SUCCESS: 'SNACKBAR.SUCCESS',
  DANGER: 'SNACKBAR.DANGER',
  CLEAR: 'SNACKBAR.CLEAR'
};
