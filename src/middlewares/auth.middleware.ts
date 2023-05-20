import { NextFunction, Request, Response } from 'express';

import { UnauthorizedError } from '@errors';
import { verifyJWT } from '@utils';

export const jwtVerify = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('Authorization header required');
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  try {
    if (token) {
      verifyJWT(token);
    }
    return next();
  } catch (error) {
    throw new UnauthorizedError('Unauthorized');
  }
};
