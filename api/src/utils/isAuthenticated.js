import { errorHandler } from './handlers';
import k from '../constants';

const isAuthenticated = types => (req, res, next) => {
  if (req.user && types.includes(req.user.type)) return next();
  const err = new Error('Unauthorized');
  err.type = k.UNAUTHORIZED;
  errorHandler(res)(err);
};

export default isAuthenticated;
