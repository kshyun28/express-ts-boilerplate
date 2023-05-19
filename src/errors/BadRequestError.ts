import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  public statusCode = 400;

  constructor(message: string, public data?: unknown) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
