import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import session from './config/session';
import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session);

app.use('/api', routes);

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
