import path from 'path';
import exists from 'path-exists';
import fs, { promises as fsPromises } from 'fs';

const basePath = process.env.STORAGE_PATH
const makeParentDir = async filepath => {
  const dirname = path.dirname(filepath)
  const dirExists = await exists(dirname)
  if (!dirExists)
    await fsPromises.mkdir(dirname, { recursive: true })
}

const writeFile = (filepath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, (err) => {
      if (err)
        reject(err)
      else
        resolve()
    })
  })
}

const MB = 2 ** 20

export const checkSize = (file, maxMB) => {
  if (file.buffer.byteLength > maxMB * MB)
    return Promise.reject(new Error(`File size is over ${maxMB} MB`))
  return Promise.resolve()
}

export const upload = (location, mimeType, content) =>
  makeParentDir(path.join(basePath, location))
    .then(() => writeFile(path.join(basePath, location), content))

export const deleteObject = location =>
  fsPromises.unlink(path.join(basePath, location));

export const getFile = location =>
  fsPromises.readFile(path.join(basePath, location));

export const getFileStream = location =>
  new Promise((resolve) => {
    resolve(fs.createReadStream(path.join(basePath, location)));
  });

export const getFileLocation = location =>
  path.join(basePath, location);
