import Joi from '@hapi/joi';

const register = Joi.object({
  body: Joi.object({
    first_name: Joi.string()
      .max(50)
      .required(),
    last_name: Joi.string()
      .max(50)
      .required(),
    tel: Joi.string()
      .max(20)
      .required(),
    email: Joi.string()
      .email()
      .required()
  }).required()
});

export default {
  register
};
