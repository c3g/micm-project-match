import { snake } from 'change-case';

export function toColumns(obj) {
  return {
    columns: Object.keys(obj)
      .map(snake)
      .join(', '),
    values: '@' + Object.keys(obj).join(', @')
  };
}

export function toMapping(obj) {
  return Object.keys(obj)
    .map(snake)
    .map(key => `${key} = @${key}`)
    .join(', ');
}
