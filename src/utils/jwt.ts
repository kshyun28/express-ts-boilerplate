import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '@config';

export const generateJWT = (username: string) => {
  return sign({ username }, JWT_SECRET!);
};

export const verifyJWT = (token: string) => {
  verify(token, JWT_SECRET!);
};
