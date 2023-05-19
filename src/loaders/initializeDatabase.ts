import mongoose from 'mongoose';

import { logger } from '@utils';
const uri = process.env['MONGODB_URI']!;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error: unknown) {
    logger.error('Failed to connect to database', { error });
  }
};
