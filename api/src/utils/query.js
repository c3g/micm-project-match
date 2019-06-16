import { snake } from 'change-case';

export function toColumns(obj) {
  return {
    columns: Object.keys(obj)
      .map(snake)
      .join(', '),
    values:
      (Object.keys(obj).length > 0 ? '@' : '') + Object.keys(obj).join(', @')
  };
}

export function toMapping(obj) {
  return (
    Object.keys(obj)
      .map(key => `${snake(key)} = @${key}`)
      .join(', ') || ''
  );
}
