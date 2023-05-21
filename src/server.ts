import * as dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';

import { PORT } from '@config';
import { connectMongoDB } from '@loaders';
import { errorHandler } from '@middlewares';
import v1 from '@routes/v1';
import { formatResponse, logger } from '@utils';

const app = express();

app.enable('trust proxy');

app.use(json());

connectMongoDB();

app.use('/v1', v1);

// Default route is 404
app.all('*', (_req, res) => {
  res.status(404).json(formatResponse('Not found', null));
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`The application is listening on port ${PORT}!`);
});
