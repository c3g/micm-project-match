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
    organizations: Joi.array().items(Joi.string()),
    tagId: Joi.array().items(Joi.number())
  }).required()
});

const update = Joi.object({
  body: Joi.object({
    id: Joi.number().required(),
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
    organizations: Joi.array().items(Joi.string()),
    tagId: Joi.array().items(Joi.number())
  }).required()
});

const search = Joi.object({
  query: Joi.object({
    term: Joi.string().required()
  }).required(),
  body: Joi.object({
    keywords: Joi.array()
  }).required()
});

const details = Joi.object({
  params: Joi.object({
    id: Joi.number().required()
  }).required()
});

const deleteDocument = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }).required()
});

const createDocument = Joi.object({
  body: Joi.object({
    id: Joi.number().required()
  })
});

const getDocument = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
});

export default {
  create,
  update,
  search,
  details,
  deleteDocument,
  createDocument,
  getDocument
};
