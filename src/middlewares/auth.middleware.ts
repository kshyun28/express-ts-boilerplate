import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { ForbiddenError, UnauthorizedError } from '@errors';
import { User } from '@models';
import { errorResponse, logger, verifyJWT } from '@utils';

// Returns 401 error when JWT is invalid
export const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError('Authorization header required');
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Unauthorized');
    }
    verifyJWT(token);
    return next();
  } catch (error) {
    logger.error(error);
    return errorResponse(res, error, 'Unauthorized');
  }
};

// Returns 403 error when JWT does not have privileges to access resource
export const jwtVerifySameUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError('Authorization header required');
    }
    const authHeader = req.headers.authorization;
    const { userId } = req.params;
    const token = authHeader.split(' ')[1];
    if (!Types.ObjectId.isValid(userId!)) {
      throw new UnauthorizedError('Unauthorized');
    }
    if (!token) {
      throw new UnauthorizedError('Unauthorized');
    }
    // if JWT email is same as user being accessed
    const email = verifyJWT(token);
    const user = await User.findById(userId);
    if (user?.email != email) {
      throw new ForbiddenError('Forbidden');
    }
    return next();
  } catch (error) {
    logger.error(error);
    return errorResponse(res, error, 'Unauthorized');
  }
};

// Does not return 401 error when JWT is invalid
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
