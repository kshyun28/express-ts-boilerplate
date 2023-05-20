import { Request } from 'express';
import { createTransport } from 'nodemailer';

import { MAIL_PASSWORD, MAIL_USERNAME, PORT } from '@config';
import { BadRequestError, InternalServerError } from '@errors';
import { User } from '@models';
import { logger } from '@utils';

export const sendEmail = async (req: Request, email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('User not found');
    }

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"no-reply" <no-reply@gmail.com>',
      to: user.email,
      subject: 'Activate your account',
      html: `Hello user, 
        <br>
        <br>
        Please activate your account here:
        <br>
        <b>PATCH</b> ${req.protocol}://${req.hostname}:${PORT}/v1/users/activate/${user._id}/${user.activationToken}
      `,
    });
    logger.info(`Email sent: ${info.messageId}`);
  } catch (error: unknown) {
    logger.error(error);
    throw new InternalServerError('Failed to send email');
  }
};
