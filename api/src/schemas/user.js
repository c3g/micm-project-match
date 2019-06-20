import Joi from '@hapi/joi';
import k from '../constants';

const updateUser = Joi.object({
  body: Joi.object({
    firstName: Joi.string()
      .max(50)
      .required(),
    lastName: Joi.string()
      .max(50)
      .required(),
    tel: Joi.string().max(20),
    email: Joi.string().email(),
    type: Joi.string()
      .valid(k.PROFESSOR, k.STUDENT)
      .required()
  }).required()
});

const updateProfessor = Joi.object({
  body: Joi.object({
    department: Joi.string()
      .max(150)
      .required(),
    position: Joi.string()
      .max(150)
      .required()
  }).required()
});

export default {
  updateUser,
  updateProfessor
};
