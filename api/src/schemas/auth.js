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
      tel: Joi.string().max(20),
      email: Joi.string()
        .email()
        .required(),
      type: Joi.string()
        .valid('PROFESSOR', 'STUDENT')
        .required()
    }).required(),
    captchaResponse: Joi.string().required()
  }).required()
});

const setPassword = Joi.object({
  body: Joi.object({
    password: Joi.string()
      .max(30)
      .min(8)
      .required(),
    token: Joi.string().required()
  }).required()
});

const forgotPassword = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    captchaResponse: Joi.string().required()
  }).required()
});

const registerResend = Joi.object({
  params: Joi.object({
    email: Joi.string()
      .email()
      .required()
  }).required()
});

export default {
  register,
  setPassword,
  forgotPassword,
  registerResend
};
