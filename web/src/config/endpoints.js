export const url = process.env.PUBLIC_URL;
export const prefix = '/api';
export const api = `${prefix}`;
export const facebookLogin = `${url}/${prefix}/auth/facebook/`;
export const googleLogin = `${url}/${prefix}/auth/google/`;

export default {
  api,
  prefix,
  url,
  facebookLogin
};
