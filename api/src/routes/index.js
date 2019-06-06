import express from 'express';

import validator from '../utils/validator';
import schemas from '../schemas';
import auth from './auth';

const router = express.Router();

router.post('/register', validator(schemas.auth.register), auth.register);
router.post(
  '/setpassword',
  validator(schemas.auth.setPassword),
  auth.setPassword
);

module.exports = router;
