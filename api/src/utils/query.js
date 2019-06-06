import { snake } from 'change-case';

export function objToColumns(obj) {
  return {
    columns: Object.keys(obj)
      .map(snake)
      .join(', '),
    values: '@' + Object.keys(obj).join(', @')
  };
}

export function objToMapping(obj) {
  return Object.keys(obj)
    .map(snake)
    .map(key => `${key} = @${key}`)
    .join(', ');
}
