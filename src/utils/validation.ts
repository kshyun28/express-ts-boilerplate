import { Request } from 'express';

import { BadRequestError } from '@errors';

import { logger } from './logger';

export const validateRequestBody = (
  body: Request<any>,
  schema: Zod.AnyZodObject | Zod.ZodUnion<any>,
) => {
  if (!body) {
    throw new BadRequestError('Request body is undefined');
  }
  const validation = schema.safeParse(body);
  logger.info('Request Body Validation', { data: validation });
  if (!validation.success) {
    throw new BadRequestError(
      'Request body validation failed',
      validation.error,
    );
  }
  return validation.data;
};
