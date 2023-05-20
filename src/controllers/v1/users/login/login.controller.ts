import { Request, Response } from 'express';

import { UnauthorizedError } from '@errors';
import { User } from '@models';
import {
  comparePassword,
  errorResponse,
  formatResponse,
  generateJWT,
  logger,
} from '@utils';

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      email: username,
    });
    if (!user) {
      throw new UnauthorizedError('User does not exist');
    }
    if (!user.active) {
      throw new UnauthorizedError('User is not active');
    }

    const validPassword = await comparePassword(password, user.password);
    logger.info(validPassword);
    if (!validPassword) {
      throw new UnauthorizedError('Failed to login');
    }

    const token = generateJWT(username);
    return res
      .status(200)
      .json(formatResponse('Successfully logged in', { token }));
  } catch (error: unknown) {
    return await errorResponse(res, error, 'Failed to login');
  }
};
