import { Request, Response } from 'express';

import { logger } from '@utils';

export const list = async (_req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json(null);
  } catch (exception: unknown) {
    logger.error(exception);
    return res.status(500).json(null);
  }
};
