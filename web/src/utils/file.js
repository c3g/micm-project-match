const MB = 2 ** 20;

export function checkSizeInMB(file, sizeInMB) {
  return file.size < sizeInMB * MB;
}

export default { checkSizeInMB };
