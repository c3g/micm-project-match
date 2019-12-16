import path from 'path';
import fs, { promises as fsPromises } from 'fs';

const basePath = process.env.STORAGE_PATH
const makeParentDir = filepath => fsPromises.mkdir(path.dirname(filepath), { recursive: true })

export const upload = (location, mimeType, content) =>
  makeParentDir(path.join(basePath, location))
  .then(() =>
    fsPromises.writeFile(path.join(basePath, location), content)
  );

export const deleteObject = location =>
  fsPromises.unlink(path.join(basePath, location));

export const getFile = location =>
  fsPromises.readFile(path.join(basePath, location));

export const getFileStream = location =>
  new Promise((resolve) => {
    resolve(fs.createReadStream(path.join(basePath, location)));
  });
