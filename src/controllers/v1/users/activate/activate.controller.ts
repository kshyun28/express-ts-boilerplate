import { Request, Response } from 'express';

import { BadRequestError, UnauthorizedError } from '@errors';
import { User } from '@models';
import { errorResponse, formatResponse } from '@utils';

export const activate = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userId, token } = req.params;

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      throw new BadRequestError('User does not exist');
    }
    if (user.active) {
      throw new BadRequestError('User is already active');
    }
    if (user.activationToken != token) {
      throw new UnauthorizedError('Invalid activation token for user');
    }

    user.active = true;
    user.save();

    return res
      .status(200)
      .json(formatResponse('User successfully activated', user));
  } catch (error: unknown) {
    return errorResponse(res, error, 'User failed to activate');
  }
};
