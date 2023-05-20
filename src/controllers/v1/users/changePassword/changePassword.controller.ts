import { Request, Response } from 'express';

import { BadRequestError, NotFoundError } from '@errors';
import { User } from '@models';
import {
  comparePassword,
  errorResponse,
  formatResponse,
  hashPassword,
  validateRequestBody,
} from '@utils';

import { ChangePasswordRequestSchema } from './changePassword.validation';

export const changePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { currentPassword, updatedPassword } = await validateRequestBody(
      req.body,
      ChangePasswordRequestSchema,
    );

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const validCurrentPassword = await comparePassword(
      currentPassword,
      user.password,
    );
    if (!validCurrentPassword) {
      throw new BadRequestError('Current password verification failed');
    }

    user.password = await hashPassword(updatedPassword);
    user.save();

    return res
      .status(200)
      .json(formatResponse('User password successfully updated', null));
  } catch (error: unknown) {
    return errorResponse(res, error, 'Failed to change password');
  }
};
