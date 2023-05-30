import { Response } from 'express';

import { BaseError } from '@errors';

import { logger } from './logger';

export const errorResponse = (
  res: Response,
  error: unknown,
  logMessage: string,
) => {
  const serializedError =
    error instanceof BaseError ? error.serializeErrors() : null;
  logger.error(logMessage, { error, serializedError });
  const message =
    error instanceof BaseError
      ? error.message
      : 'Something went wrong. Please try again later.';
  const statusCode = error instanceof BaseError ? error.statusCode : 500;
  const data = error instanceof BaseError ? error.data : null;
  return res.status(statusCode).json(formatResponse(message, data));
};

export const formatResponse = (message: string, data: unknown) => {
  return {
    message: message,
    data: data,
  };
};
