import Joi from '@hapi/joi';

const create = Joi.object({
  body: Joi.object({
    applicantId: Joi.number().required(),
    projectId: Joi.number().required(),
    proposal: Joi.string().required()
  }).required()
});

const findByApplicantProject = Joi.object({
  params: Joi.object({
    projectId: Joi.number().required()
  }).required()
});

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

export default {
  create,
  findByApplicantProject,
  update,
  approve
};
