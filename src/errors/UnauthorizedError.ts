import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  public statusCode = 401;

  constructor(message: string, public data?: unknown) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
