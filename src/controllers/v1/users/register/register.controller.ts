import { Request, Response } from 'express';

import { BadRequestError, InternalServerError } from '@errors';
import { IUser, User } from '@models';
import { sendEmail } from '@services';
import {
  errorResponse,
  filterUser,
  formatResponse,
  hashPassword,
  uuidv4,
  validateRequestBody,
} from '@utils';

import { RegisterUserRequestSchema } from './register.validation';

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password, firstName, lastName } = await validateRequestBody(
      req.body,
      RegisterUserRequestSchema,
    );

    const userIsExisting = await User.findOne({
      email,
    });
    if (userIsExisting) {
      throw new BadRequestError('User email already exists');
    }

    const token = uuidv4;
    const user = new User({
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
      activationToken: token,
    });
    await user.save().catch((error: unknown) => {
      throw new InternalServerError('Failed to save user to database', error);
    });

    await sendEmail(req, email);

    return res
      .status(201)
      .json(
        formatResponse(
          'User successfully registered',
          filterUser(user as unknown as IUser),
        ),
      );
  } catch (error: unknown) {
    return errorResponse(res, error, 'User failed to register');
  }
};
