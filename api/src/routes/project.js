import { Project } from '../models';
import { errorHandler, dataHandler, okHandler } from '../utils/handlers';
import * as File from '../utils/file';

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
  Project.search(req.query)
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

export default {
  create,
  update,
  list,
  search,
  details,
  listUserProjects,
  deleteDocument
};
