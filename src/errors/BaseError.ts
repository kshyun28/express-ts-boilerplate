export abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract data?: unknown;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): { message: string };
}
