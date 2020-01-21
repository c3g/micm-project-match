import 'dotenv/config';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from './config/session';
import routes from './routes';
import adminRoute from './routes/admin';
import passportConfig from './config/passport';
import { scheduledEmailUpdates } from './mail';
import { adminAccess } from './utils/express';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use(express.static(path.join(__dirname, '../../web/dist')));

// API
app.use('/api', routes(passport));
app.use('/api/admin', adminAccess, adminRoute);

// Send index.html by default
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
});

scheduledEmailUpdates();

export default app;
