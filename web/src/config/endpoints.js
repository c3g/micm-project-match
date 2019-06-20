export const url = 'http://localhost:3000';
export const prefix = '/api';
export const api = `${prefix}`;
export const facebookLogin = `${url}${prefix}/auth/facebook/`;
export const googleLogin = `${url}${prefix}/auth/google/`;
export const logout = `${url}${prefix}/logout`;

export default {
  api,
  prefix,
  url,
  facebookLogin,
  logout
};
