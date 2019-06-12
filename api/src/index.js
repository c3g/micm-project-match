import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from './config/session';
import routes from './routes';
import passportConfig from './config/passport';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use('/api', routes(passport));

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
