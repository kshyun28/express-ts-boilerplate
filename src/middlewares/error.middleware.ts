import { NextFunction, Request, Response } from 'express';

import { BaseError } from '@errors';
import { formatResponse, logger } from '@utils';

export const errorHandler = async (
  error: BaseError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const serializedError =
    error instanceof BaseError ? error.serializeErrors() : null;
  logger.error(error.message, { error, serializedError });
  const message =
    error instanceof BaseError
      ? error.message
      : 'Something went wrong. Please try again later.';
  const statusCode = error instanceof BaseError ? error.statusCode : 500;
  const data = error instanceof BaseError ? error.data : null;

  return res.status(statusCode).json(formatResponse(message, data));
};
