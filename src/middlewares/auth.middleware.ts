import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@errors';
import { logger, verifyJWT } from '@utils';

export const jwtVerify = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('Authorization header required');
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    if (!token) {
      throw new UnauthorizedError('Unauthorized');
    }
    verifyJWT(token);
    return next();
  } catch (error) {
    logger.error(error);
    throw new UnauthorizedError('Unauthorized');
  }
};

export const jwtVerifyOptional = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('Authorization header required');
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    if (!token) {
      throw new UnauthorizedError('Unauthorized');
    }
    verifyJWT(token);
    req.authenticated = true;
    return next();
  } catch (error) {
    logger.error(error);
    req.authenticated = false;
    return next();
  }
};
