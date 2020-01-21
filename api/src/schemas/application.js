import Joi from '@hapi/joi';

const create = Joi.object({
  body: Joi.object({
    isMcgillStudent: Joi.boolean(),
    university: Joi.string().allow('', null),
    studyProgram: Joi.string(),
    studyYear: Joi.string(),
    graduationYear: Joi.string(),
    otherInternships: Joi.boolean(),
    otherInternshipsDetails: Joi.string(),
    transcript: Joi.any()
  }).required()
});

const findByApplicant = Joi.object({});

const update = Joi.object({
  body: Joi.object({
    id: Joi.number().required()
  }).unknown().required()
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
