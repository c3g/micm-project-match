import express from 'express';
import { Tag } from '../models';
import validator from '../utils/validator';
import { errorHandler, dataHandler } from '../utils/handlers';
import { access } from '../utils/express';
import schemas from '../schemas';

const router = express.Router();

router.post(
  '/create',
  validator(schemas.tag.create),
  access.setup,
  create
);
router.get(
  '/search',
  validator(schemas.tag.search),
  access.setup,
  search
);

export default router;

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
