import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';

const Joi = BaseJoi.extend(Extension);

const create = Joi.object({
  body: Joi.object({
    title: Joi.string()
      .max(100)
      .required(),
    startDate: Joi.date()
      .format('YYYY-MM-DD')
      .required(),
    axis: Joi.string().required(),
    abstract: Joi.string().required(),
    description: Joi.string().required(),
    datasets: Joi.string().required(),
    motive: Joi.string().required(),
    timeframe: Joi.string()
      .max(20)
      .required(),
    openForStudents: Joi.bool().required(),
    organizations: Joi.array().items(Joi.string())
  }).required()
});

const search = Joi.object({
  query: Joi.object({
    term: Joi.string().required()
  }).required()
});

const details = Joi.object({
  params: Joi.object({
    id: Joi.number().required()
  }).required()
});

export default {
  create,
  search,
  details
};
