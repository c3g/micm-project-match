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
      .valid(k.USER_TYPE.PROFESSOR, k.USER_TYPE.STUDENT)
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

const details = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const contactUs = Joi.object({
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    message: Joi.string()
  })
});

const approveProfessor = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const disapproveProfessor = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

export default {
  updateUser,
  updateProfessor,
  details,
  contactUs,
  approveProfessor,
  disapproveProfessor
};
