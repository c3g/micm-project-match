import { Application } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';
import k from '../constants';

function create(req, res) {
  Application.create(req.body)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function findByApplicantProject(req, res) {
  Application.findByApplicantProject({
    projectId: req.params.projectId,
    applicantId: req.user.id
  })
    .then(dataHandler(res))
    .catch(err =>
      err.type === k.APPLICATION_NOT_FOUND
        ? dataHandler(res)(null)
        : errorHandler(res)(err)
    );
}

function update(req, res) {
  const application = {
    proposal: req.body.proposal,
    applicationId: req.body.applicationId,
    applicantId: req.user.id
  };
  Application.update(application)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function selectApplications(req, res) {
  Application.selectApplications(req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function approve(req, res) {
  Application.approve(req.params.id, req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function disapprove(req, res) {
  Application.disapprove(req.params.id, req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function applied(req, res) {
  Application.applied(req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function claim(req, res) {
  Application.claim(req.params.id, req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default {
  create,
  findByApplicantProject,
  update,
  selectApplications,
  approve,
  disapprove,
  applied,
  claim
};
