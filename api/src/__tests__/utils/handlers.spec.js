import httpMocks from 'node-mocks-http';
import { errorHandler, okHandler, dataHandler } from '../../utils/handlers';
import k from '../../constants';

describe('Handlers Util', () => {
  describe('errorHandler', () => {
    let consoleError;

    beforeEach(() => {
      consoleError = console.err;
      console.error = jest.fn();
    });

    afterEach(() => {
      console.err = consoleError;
    });

    it('should log unknown errors', () => {
      const err = new Error('foo');
      const res = httpMocks.createResponse();
      errorHandler(res)(err);
      expect(console.error).toHaveBeenCalledWith(err);
    });

    it('should respond with correct status code for known error', () => {
      const err = new Error('foo');
      err.type = k.ACCOUNT_NOT_FOUND;
      const res = httpMocks.createResponse();
      errorHandler(res)(err);
      expect(res.statusCode).toBe(404);
    });

    it('should respond with 500 when error is unknown', () => {
      const err = new Error('foo');
      const res = httpMocks.createResponse();
      errorHandler(res)(err);
      expect(res.statusCode).toBe(500);
    });

    it('should have correct response format in production', () => {
      const err = new Error();
      const res = httpMocks.createResponse();
      const nodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      errorHandler(res)(err);
      process.env.NODE_ENV = nodeEnv;
      const data = res._getJSONData();
      expect(data).toHaveProperty('success');
      expect(data).toHaveProperty('message');
      expect(data.message).toBe('Internal server error');
    });
  });

  describe('okHandler', () => {
    it('should respond with 200 status code by default', () => {
      const res = httpMocks.createResponse();
      okHandler(res)();
      expect(res.statusCode).toBe(200);
    });

    it('should respond with correct status code when passed', () => {
      const res = httpMocks.createResponse();
      okHandler(res, 300)();
      expect(res.statusCode).toBe(300);
    });

    it('should have correct response format', () => {
      const res = httpMocks.createResponse();
      okHandler(res)();
      const data = res._getJSONData();
      expect(data).toHaveProperty('success');
      expect(data.success).toBe(true);
    });
  });

  describe('dataHandler', () => {
    it('should respond with 200 status code by default', () => {
      const res = httpMocks.createResponse();
      okHandler(res)();
      expect(res.statusCode).toBe(200);
    });

    it('should respond with correct status code when passed', () => {
      const res = httpMocks.createResponse();
      okHandler(res, 300)();
      expect(res.statusCode).toBe(300);
    });

    it('should have correct response format', () => {
      const res = httpMocks.createResponse();
      const resData = { foo: 'bar' };
      dataHandler(res)(resData);
      const data = res._getJSONData();
      expect(data).toHaveProperty('success');
      expect(data.success).toBe(true);
      expect(data.data).toEqual(resData);
    });
  });
});
