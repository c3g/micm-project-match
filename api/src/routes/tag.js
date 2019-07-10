import { Tag } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';

function create(req, res) {
  Tag.create(req.body)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function search(req, res) {
  Tag.search(req.query)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default { create, search };
