import { Project } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';
import * as File from '../utils/file';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function create(req, res) {
  function uploadFiles(project) {
    return req.files.map(file =>
      File.upload({
        Key: `projects/${project.id}/documents/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
      }).then(fileData =>
        Project.addDocument(fileData, project.id, file.originalname)
      )
    );
  }

  Project.create({
    ...req.body,
    authorId: req.user.id
  }).then(project => {
    const fileUploads = uploadFiles(project);
    Promise.all(fileUploads)
      .then(() => dataHandler(res)(project))
      .catch(errorHandler(res));
  });
}

function update(req, res) {
  Project.update({ ...req.body, authorId: req.user.id })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function list(req, res) {
  Project.selectAll()
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function search(req, res) {
  Project.search({ ...req.query, ...req.body })
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function details(req, res) {
  Project.details(req.params.id, req.user.id)
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
    .then(data => File.deleteObject({ Key: data.rows[0].key }))
    .then(okHandler(res))
    .catch(errorHandler(res));
}

function createDocument(req, res) {
  function uploadFiles(project) {
    return req.files.map(file =>
      File.upload({
        Key: `projects/${project.id}/documents/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
      }).then(fileData =>
        Project.addDocument(fileData, project.id, file.originalname)
      )
    );
  }
  Project.findById(req.body.id)
    .then(project =>
      project.authorId !== req.user.id
        ? rejectMessage('Unauthorized', k.UNAUTHORIZED)
        : project
    )
    .then(project => {
      const fileUploads = uploadFiles(project);
      Promise.all(fileUploads)
        .then(() => dataHandler(res)(project))
        .catch(errorHandler(res));
    });
}

function getDocument(req, res) {
  Project.projectId(req.params.id, req.user.id)
    .then(() => Project.findDocumentById(req.params.id))
    .then(document => File.getFile({ Key: document.key }))
    .then(file => file.createReadStream().pipe(res))
    .catch(errorHandler(res));
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
