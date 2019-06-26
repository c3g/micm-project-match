import { Project } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';

function create(req, res) {
  Project.create({ ...req.body, authorId: req.user.id })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default {
  create
};
