import Joi from '@hapi/joi';

const validator = schema => (req, res, next) => {
  let data = {};
  if (Object.keys(req.query).length) data.query = req.query;
  if (Object.keys(req.params).length) data.params = req.params;
  if (Object.keys(req.body).length) data.body = req.body;
  Joi.validate(data, schema, { abortEarly: false }, (err, value) => {
    if (err)
      return res.status(422).json({
        success: false,
        message:
          process.env.NODE_ENV === 'production'
            ? 'Invalid input'
            : err.details
                .map(({ message, path }) => {
                  return `${message}${path ? ` (${path})` : ''}`;
                })
                .toString()
      });
    req.payload = value;
    next();
  });
};

export default validator;
