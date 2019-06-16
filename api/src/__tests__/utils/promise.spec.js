import { rejectMessage } from '../../utils/promise';

describe('Promise Util', () => {
  describe('rejectMessage', () => {
    it('should return a promise rejection', () => {
      return expect(rejectMessage('foo', 'bar')).rejects.toThrow();
    });

    it('should return the correct error message', () => {
      return rejectMessage('foo', 'bar').catch(err =>
        expect(err.message).toBe('foo')
      );
    });

    it('should return the correct error type', () => {
      return rejectMessage('foo', 'bar').catch(err =>
        expect(err.type).toBe('bar')
      );
    });
  });
});
