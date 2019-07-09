import Joi from '@hapi/joi';

const create = Joi.object({
  body: Joi.object({
    text: Joi.string()
      .max(50)
      .required()
  }).required()
});

const search = Joi.object({
  query: Joi.object({
    term: Joi.string().required()
  }).required()
});

export default {
  create,
  search
};
