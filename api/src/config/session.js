import session from 'express-session';
import redisStore from './redis';

export default session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'secret',
  store: redisStore(session),
  cookie: { maxAge: 604800000 }
});
