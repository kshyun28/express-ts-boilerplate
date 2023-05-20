import { Request, Response } from 'express';

import { NotFoundError } from '@errors';
import { IUser, User } from '@models';
import {
  errorResponse,
  filterUnauthenticatedUser,
  filterUser,
  formatResponse,
} from '@utils';

export const details = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    let response;
    if (req.authenticated) {
      response = filterUser(user as unknown as IUser);
    } else {
      response = filterUnauthenticatedUser(user as unknown as IUser);
    }

    return res.status(200).json(formatResponse('User details', response));
  } catch (error: unknown) {
    return await errorResponse(res, error, 'Failed to get user details');
  }
};
