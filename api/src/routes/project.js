import { Project } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';

function create(req, res) {
  // TODO upload files to S3 and add tags
  Project.create({ ...req.body, authorId: req.user.id })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function list(req, res) {
  Project.selectAll()
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function search(req, res) {
  Project.search(req.query)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function details(req, res) {
  Project.details(req.params.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default {
  create,
  list,
  search,
  details
};
