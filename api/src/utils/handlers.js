import k from '../constants';

export const errorHandler = (res, status = 500) => err => {
  const errStatus = {
    [k.ROW_NOT_FOUND]: 404,
    [k.ACCOUNT_NOT_FOUND]: 404,
    [k.EMAIL_EXISTS]: 409,
    [k.INCORRECT_CREDENTIALS]: 401,
    [k.TOKEN_NOT_FOUND]: 409,
    [k.PASSWORD_NOT_SET]: 404,
    [k.TAG_NOT_FOUND]: 404,
    [k.APPLICATION_NOT_FOUND]: 404,
    [k.UNAUTHORIZED]: 401,
    [k.DOCUMENT_NOT_FOUND]: 404
  };
  let unknownErr = false;
  if (err.type && errStatus[err.type]) {
    status = errStatus[err.type];
  } else {
    console.error(err);
    unknownErr = true;
  }
  const response = {
    success: false,
    message: unknownErr ? 'Internal server error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && {
      message: err.message,
      code: err.code,
      type: err.type,
      stack: err.stack && err.stack.split('\n')
    })
  };
  res.status(status).json(response);
  res.end();
};

export const dataHandler = (res, status = 200) => data => {
  res.status(status).json({ success: true, data });
  res.end();
};

export const okHandler = (res, status = 200) => () => {
  res.status(status).json({ success: true });
  res.end();
};
