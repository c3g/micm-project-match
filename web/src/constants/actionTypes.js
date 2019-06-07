import { createNetworkConstants } from 'Src/utils';

export const REGISTER = createNetworkConstants('REGISTER');
export const SET_PASSWORD = createNetworkConstants('SET_PASSWORD');
export const FORGOT_PASSWORD = createNetworkConstants('FORGOT_PASSWORD');
export const AUTH = createNetworkConstants('AUTH');

export const LOADING = {
  START: 'LOADING.START',
  DONE: 'LOADING.DONE'
};

export const SNACKBAR = {
  INFO: 'SNACKBAR.INFO',
  SUCCESS: 'SNACKBAR.SUCCESS',
  DANGER: 'SNACKBAR.DANGER',
  CLEAR: 'SNACKBAR.CLEAR'
};
