export function rejectMessage(message, type) {
  const e = new Error(message);
  e.type = type;
  return Promise.reject(e);
}
