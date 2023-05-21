import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, json } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import { PORT } from '@config';
import { connectMongoDB } from '@loaders';
import { errorHandler } from '@middlewares';
import v1 from '@routes/v1';
import { formatResponse, logger } from '@utils';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: async (_req: Request, res: Response) => {
    res
      .status(429)
      .json(formatResponse('Too many requests, please try again later.', null));
  },
});

// Middlewares
app.enable('trust proxy'); // return 'https' when referencing req.protocol
app.use(json());
app.use(helmet());
app.use(cors());
app.use(limiter);

// Routes
app.use('/v1', v1);

// Default route is 404
app.all('*', (_req: Request, res: Response) => {
  res.status(404).json(formatResponse('Not found', null));
});

app.use(errorHandler);

connectMongoDB();

app.listen(PORT, () => {
  logger.info(`The application is listening on port ${PORT}!`);
});
