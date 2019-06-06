import Joi from '@hapi/joi';

const register = Joi.object({
  body: Joi.object({
    userData: Joi.object({
      firstName: Joi.string()
        .max(50)
        .required(),
      lastName: Joi.string()
        .max(50)
        .required(),
      tel: Joi.string()
        .max(20)
        .required(),
      email: Joi.string()
        .email()
        .required()
    }).required(),
    captchaResponse: Joi.string().required()
  }).required()
});

export default {
  register
};
