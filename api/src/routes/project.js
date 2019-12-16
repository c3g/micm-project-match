import { Project } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';
import * as File from '../utils/file';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function create(req, res) {
  Project.create({
    ...req.body,
    authorId: req.user.id
  })
  .then(project => {
    uploadFiles(req.files, project)
      .then(() => dataHandler(res)(project))
      .catch(errorHandler(res));
  });
}

function update(req, res) {
  Project.update({ ...req.body, userId: req.user.id })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function list(req, res) {
  Project.selectAll(req.user.type === k.USER_TYPE.ADMIN)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function search(req, res) {
  Project.search(
    { ...req.query, ...req.body },
    req.user.type === k.USER_TYPE.ADMIN
  )
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function details(req, res) {
  Project.details(
    req.params.id,
    req.user.id,
    req.user.type === k.USER_TYPE.ADMIN
  )
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function listUserProjects(req, res) {
  Project.listUserProjects(req.user.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function deleteDocument(req, res) {
  Project.deleteDocument(req.params.id, req.user.id)
    .then(doc => File.deleteObject({ Key: doc.key }))
    .then(okHandler(res))
    .catch(errorHandler(res));
}

function createDocument(req, res) {
  Project.findById(req.body.id)
  .then(project =>
    hasAccess(req.user.id, project) === false ?
      rejectMessage('Unauthorized', k.UNAUTHORIZED) :
      uploadFiles(req.files, project)
        .then(() => dataHandler(res)(project))
        .catch(errorHandler(res))
  );
}

function getDocument(req, res) {
  Project.projectId(req.params.id, req.user.id)
    .then(() => Project.findDocumentById(req.params.id))
    .then(document => File.getFile({ Key: document.key }))
    .then(file => file.createReadStream().pipe(res))
    .catch(
      err =>
        (err.type =
          k.PROJECT_NOT_FOUND && req.user.type === k.USER_TYPE.ADMIN
            ? Project.findDocumentById(req.params.id)
                .then(document => File.getFile({ Key: document.key }))
                .then(file => file.createReadStream().pipe(res))
            : errorHandler(res)(err))
    );
}

export default {
  create,
  update,
  list,
  search,
  details,
  listUserProjects,
  deleteDocument,
  createDocument,
  getDocument
};

// Helpers

function uploadFiles(files, project) {
  return Promise.all(files.map(file =>
    File.upload({
      Key: `projects/${project.id}/documents/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).then(fileData =>
      Project.addDocument(fileData, project.id, file.originalname)
    )
  ));
}

function hasAccess(userId, project) {
  return project.authorId === userId || project.chosenId === userId;
}
