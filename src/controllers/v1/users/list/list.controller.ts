import { Request, Response } from 'express';

import { NotFoundError } from '@errors';
import { IUser, User } from '@models';
import {
  errorResponse,
  filterUnauthenticatedUser,
  filterUser,
  formatResponse,
} from '@utils';

export const list = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();
    if (!users) {
      throw new NotFoundError('No users found');
    }

    let response;
    if (req.authenticated) {
      response = users.map(user => {
        return filterUser(user as unknown as IUser);
      });
    } else {
      response = users.map(user => {
        return filterUnauthenticatedUser(user as unknown as IUser);
      });
    }

    return res.status(200).json(formatResponse('Users List', response));
  } catch (error: unknown) {
    return await errorResponse(res, error, 'Failed to get users list');
  }
};
