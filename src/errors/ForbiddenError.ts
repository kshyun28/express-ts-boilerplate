import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  public statusCode = 403;

  constructor(message: string, public data?: unknown) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
