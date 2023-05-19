import { BaseError } from './BaseError';

export class InternalServerError extends BaseError {
  public statusCode = 500;

  constructor(message: string, public data?: unknown) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
