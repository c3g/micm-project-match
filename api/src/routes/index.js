import express from 'express';

import validator from '../utils/validator';
import schemas from '../schemas';
import auth from './auth';

const router = express.Router();

router.post('/register', validator(schemas.auth.register), auth.register);
router.get(
  '/register/resend/:email',
  validator(schemas.auth.registerResend),
  auth.registerResend
);
router.post(
  '/setpassword',
  validator(schemas.auth.setPassword),
  auth.setPassword
);
router.post(
  '/forgotpassword',
  validator(schemas.auth.forgotPassword),
  auth.forgotPassword
);

export default router;
