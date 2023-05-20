export {};

declare global {
  namespace Express {
    interface Request {
      authenticated: boolean;
    }
  }
}
