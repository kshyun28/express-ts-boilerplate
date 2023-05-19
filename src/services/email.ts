import { createTransport } from 'nodemailer';

import { MAIL_PASSWORD, MAIL_USERNAME } from '@config';
import { InternalServerError } from '@errors';
import { logger } from '@utils';

export const sendEmail = async (email: string) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
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
