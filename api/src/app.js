import 'dotenv/config';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from './config/session';
import routes from './routes';
import passportConfig from './config/passport';
import { scheduledEmailUpdates } from './mail';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use(express.static(path.join(__dirname, '../../web/dist')));
app.use('/api', routes(passport));

scheduledEmailUpdates();

export default app;
