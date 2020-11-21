const express = require('express');
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';

import routes from '../routes/index';
const app = express();

// parse body params and attache them to req.body
app.use(json());
app.use(urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
// app.use('/api', jwt(), routes);
app.use('/api', routes);
app.use('/public', express.static('public'));

export default app;
