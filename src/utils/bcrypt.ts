import { compare, genSalt, hash } from 'bcrypt';

import { SALT_ROUNDS } from '@config';
import { InternalServerError } from '@errors';

import { logger } from './logger';

export const hashPassword = async (password: string) => {
  try {
    const salt = await genSalt(Number(SALT_ROUNDS!));
    return await hash(password, salt);
  } catch (error: unknown) {
    logger.error(error);
    throw new InternalServerError('Failed to hash password');
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  try {
    return compare(password, hashedPassword);
  } catch (error: unknown) {
    logger.error(error);
    throw new InternalServerError('Failed to validate password');
  }
};
