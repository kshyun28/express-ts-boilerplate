import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  public statusCode = 404;

  constructor(message: string, public data?: unknown) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
