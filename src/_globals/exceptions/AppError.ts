export class AppError extends Error {
  public readonly httpStatusCode: number;

  public readonly isOperational: boolean;

  public readonly details?: object;

  constructor(
    message: string,
    httpStatusCode: number,
    isOperational: boolean = false,
    details?: {}
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // ? done to ensure that the instance has the correct prototype chain

    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    if (details) this.details = details;

    Error.captureStackTrace(this); // ? capture stack trace of current instance
  }
}
