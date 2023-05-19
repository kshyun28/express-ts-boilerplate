import mongoose from 'mongoose';

import { MONGODB_URI } from '@config';
import { logger } from '@utils';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI!);
  } catch (error: unknown) {
    logger.error('Failed to connect to database', { error });
  }
};
