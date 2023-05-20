import * as dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';

import { connectMongoDB } from '@loaders';
import { errorHandler } from '@middlewares';
import v1 from '@routes/v1';
import { formatResponse, logger } from '@utils';

const app = express();
const port = 8000;

app.use(json());

connectMongoDB();

app.use('/v1', v1);

// Default route is 404
app.all('*', (_req, res) => {
  res.status(404).json(formatResponse('Not found', null));
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`The application is listening on port ${port}!`);
});
