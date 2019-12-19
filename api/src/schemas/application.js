import Joi from '@hapi/joi';

const create = Joi.object({
  body: Joi.object({
    applicantId: Joi.number().required(),
    proposal: Joi.string().required()
  }).required()
});

const findByApplicant = Joi.object({});

const update = Joi.object({
  body: Joi.object({
    proposal: Joi.string().required(),
    applicationId: Joi.number().required()
  }).required()
}).required();

const approve = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
}).required();

const disapprove = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
}).required();

const claim = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
}).required();

export default {
  create,
  findByApplicant,
  update,
  approve,
  disapprove,
  claim
};
