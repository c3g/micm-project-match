import path from 'path';
import * as File from '../utils/file';
import { Application } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';
import k from '../constants';

function create(req, res) {
  const { user, file } = req

  const location =
    `users/${user.id}/transcript/${file.originalname}`

  uploadFile(user, location, file)
  .then(() => {
    const application = {
      applicantId: user.id,
      transcriptKey: location,

      isMcgillStudent: req.body.isMcgillStudent,
      studyProgram: req.body.studyProgram,
      studyYear: req.body.studyYear,
      graduationYear: req.body.graduationYear,
      otherInternships: req.body.otherInternships,
    }

    Application.create(application)
     .then(dataHandler(res))
     .catch(errorHandler(res)); 
  });
}

function update(req, res) {
  const { user, file } = req

  let location = undefined;
  let filePromise = Promise.resolve();

  if (file) {
    location = `users/${user.id}/transcript/${file.originalname}`;
    filePromise = uploadFile(user, location, file);
  }

  filePromise
  .then(() => {

    const application = req.body;
    application.applicantId = req.user.id;
    delete application.transcript;

    if (file) {
      application.transcriptKey = location;
    }

    Application.update(application)
     .then(dataHandler(res))
     .catch(errorHandler(res));
  });
}

function findByApplicant(req, res) {
  Application.findByApplicant(req.user.id)
    .then(dataHandler(res))
    .catch(err =>
      err.type === k.APPLICATION_NOT_FOUND
        ? dataHandler(res)(null)
        : errorHandler(res)(err)
    );
}

function list(req, res) {
  Application.list()
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

function getTranscript(req, res) {
  Application.findById(req.params.id)
    .then(application => File.getFileLocation(application.transcriptKey))
    .then(filepath => {
      res.download(filepath)
    })
    .catch(errorHandler(res));
}

export default {
  create,
  findByApplicant,
  update,
  list,
  approve,
  disapprove,
  applied,
  claim,
  getTranscript
};

// Helpers

function uploadFile(user, location, file) {
  return File.checkSize(file, 2)
  .then(() =>
    File.upload(
      location,
      file.mimetype,
      file.buffer,
    )
  );
}
