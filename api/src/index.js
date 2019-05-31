import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.NODE_PORT || 3000;

app.listen(port, () => console.log(`Listening on ${port}`));
