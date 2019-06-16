import * as Query from '../../utils/query';

describe('Query Util', () => {
  describe('toColumns', () => {
    it('should return right columns format', () => {
      const input = { fooBar: 'foo', FooBar: 'bar' };
      const { columns } = Query.toColumns(input);
      expect(columns).toBe('foo_bar, foo_bar');
    });

    it('should return right values format', () => {
      const input = { fooBar: 'foo', FooBar: 'bar' };
      const { values } = Query.toColumns(input);
      expect(values).toBe('@fooBar, @FooBar');
    });

    it('should return empty columns with empty input', () => {
      const input = {};
      const { columns } = Query.toColumns(input);
      expect(columns).toBe('');
    });

    it('should return empty values with empty input', () => {
      const input = {};
      const { values } = Query.toColumns(input);
      expect(values).toBe('');
    });
  });

  describe('toMapping', () => {
    it('should return right mapping format', () => {
      const input = { fooBar: 'foo', FooBar: 'bar' };
      const mapping = Query.toMapping(input);
      expect(mapping).toBe('foo_bar = @fooBar, foo_bar = @FooBar');
    });

    it('should return empty mapping with empty input', () => {
      const input = {};
      const mapping = Query.toMapping(input);
      expect(mapping).toBe('');
    });
  });
});
