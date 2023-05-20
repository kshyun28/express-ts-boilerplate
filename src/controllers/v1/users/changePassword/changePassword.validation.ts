import { z } from 'zod';

export const ChangePasswordRequestSchema = z.object({
  currentPassword: z
    .string()
    /* 
      At least: 
        - 1 uppercase letter
        - 1 lowercase letter
        - 1 digit
        - 1 special character
        - minimum of 8 characters
    */
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    ),
  updatedPassword: z
    .string()
    /* 
      At least: 
        - 1 uppercase letter
        - 1 lowercase letter
        - 1 digit
        - 1 special character
        - minimum of 8 characters
    */
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    ),
});
