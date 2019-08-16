import { User } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';

function listProfessors(req, res) {
  User.listProfessors()
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function approveProfessor(req, res) {
  User.approveProfessor(req.params.id)
    .then(okHandler(res))
    .catch(errorHandler(res));
}

function disapproveProfessor(req, res) {
  User.disapproveProfessor(req.params.id)
    .then(okHandler(res))
    .catch(errorHandler(res));
}

export default {
  listProfessors,
  approveProfessor,
  disapproveProfessor
};
