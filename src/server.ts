import express from 'express';

import { logger } from '@utils/logger';

const app = express();
const port = 8000;

// Default route is 404
app.all('*', (_req, res) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

app.listen(port, () => {
  logger.info(`The application is listening on port ${port}!`);
});
