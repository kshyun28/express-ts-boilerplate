import { JwtPayload, sign, verify } from 'jsonwebtoken';

import { JWT_EXPIRY, JWT_SECRET } from '@config';
import { UnauthorizedError } from '@errors';

export const generateJWT = (email: string) => {
  return sign({ email }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyJWT = (token: string) => {
  try {
    const { email } = verify(token, JWT_SECRET!) as JwtPayload;
    return email;
  } catch (error: unknown) {
    throw new UnauthorizedError('Unauthorized');
  }
};
