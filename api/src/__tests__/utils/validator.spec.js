import validator from '../../utils/validator';
import Joi from '@hapi/joi';
import httpMocks from 'node-mocks-http';

describe('Validator Util', () => {
  it('should respond with errors in development for invalid structure', () => {
    const req = httpMocks.createRequest({ body: { foo: 1 } });
    const res = httpMocks.createResponse();
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const middleware = validator(
      Joi.object({
        body: Joi.object({ foo: Joi.string().required() }).required()
      })
    );
    middleware(req, res, () => {});
    process.env.NODE_ENV = nodeEnv;
    const data = res._getJSONData();
    expect(data.success).toBe(false);
    expect(data.message).toBe('"foo" must be a string (body,foo)');
  });

  it('should respond with a message in production for invalid structure', () => {
    const req = httpMocks.createRequest({ body: { foo: 1 } });
    const res = httpMocks.createResponse();
    const nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const middleware = validator(
      Joi.object({
        body: Joi.object({ foo: Joi.string().required() }).required()
      })
    );
    middleware(req, res, () => {});
    process.env.NODE_ENV = nodeEnv;
    const data = res._getJSONData();
    expect(data.success).toBe(false);
    expect(typeof data.message).toBe('string');
  });

  it('should call the next function for valid structure', () => {
    const req = httpMocks.createRequest({ body: { foo: 'bar' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    const middleware = validator(
      Joi.object({
        body: Joi.object({ foo: Joi.string().required() }).required()
      })
    );
    middleware(req, res, next);
    expect(next).toBeCalled();
  });

  it('should not call the next function for invalid structure', () => {
    const req = httpMocks.createRequest({ body: { foo: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    const middleware = validator(
      Joi.object({
        body: Joi.object({ foo: Joi.string().required() }).required()
      })
    );
    middleware(req, res, next);
    expect(next).not.toBeCalled();
  });
});
