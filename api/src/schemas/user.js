import Joi from '@hapi/joi';

const updateUser = Joi.object({
  body: Joi.object({
    firstName: Joi.string().max(50),
    lastName: Joi.string().max(50),
    tel: Joi.string().max(20),
    email: Joi.string().email(),
    type: Joi.string().valid('PROFESSOR', 'STUDENT')
  }).required()
});

export default {
  updateUser
};
