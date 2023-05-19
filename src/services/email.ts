import { createTransport } from 'nodemailer';

import { logger } from '@utils';
import { InternalServerError } from 'src/errors/InternalServerError';

export const sendEmail = async (email: string) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env['MAIL_USERNAME'],
        pass: process.env['MAIL_PASSWORD'],
      },
    });

    const info = await transporter.sendMail({
      from: '"no-reply" <no-reply@gmail.com>',
      to: email,
      subject: 'Hello',
      text: 'Hello world',
      html: '<b>Hello world</b>',
    });
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error: unknown) {
    logger.error(error);
    throw new InternalServerError('Failed to send email');
  }
};
