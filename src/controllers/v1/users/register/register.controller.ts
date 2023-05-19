import { Request, Response } from 'express';

import { BadRequestError, InternalServerError } from '@errors';
import { User } from '@models';
import { sendEmail } from '@services';
import { errorResponse, formatResponse, validateRequestBody } from '@utils';

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

    const user = new User({
      email,
      password,
      firstName,
      lastName,
    });
    await user.save().catch((error: unknown) => {
      throw new InternalServerError('Failed to save user to database', error);
    });

    await sendEmail(email);

    return res
      .status(200)
      .json(formatResponse('User successfully registered', null));
  } catch (error: unknown) {
    return errorResponse(res, error, 'User failed to register');
  }
};
