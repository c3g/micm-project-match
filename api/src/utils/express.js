import multer from 'multer';
import Project from '../models/project';
import { isAuthenticated, isAuthenticatedOrCondition } from './authentication';
import k from '../constants';
import { errorHandler } from '../utils/handlers';

export const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const allAccess = isAuthenticated([
  k.USER_TYPE.PROFESSOR,
  k.USER_TYPE.STUDENT,
  k.USER_TYPE.ADMIN,
  k.USER_TYPE.UNSET
]);
export const setupAccess = isAuthenticated([
  k.USER_TYPE.PROFESSOR,
  k.USER_TYPE.STUDENT,
  k.USER_TYPE.ADMIN
]);
export const professorAccess = isAuthenticated([
  k.USER_TYPE.PROFESSOR,
  k.USER_TYPE.ADMIN
]);
export const adminAccess = isAuthenticated([k.USER_TYPE.ADMIN]);
export const adminOrProjectCreatorAccess = isAuthenticatedOrCondition(
  [k.USER_TYPE.ADMIN],
  async req => {
    if (!req.user || !req.params.id) return false;
    const project = await Project.findById(req.params.id);
    if (req.user.id !== project.authorId) return false;
    return true;
  }
);

export const parseBodyData = (req, res, next) => {
  try {
    req.body = JSON.parse(req.body.data);
    next();
  } catch (err) {
    errorHandler(res)(err);
  }
};
