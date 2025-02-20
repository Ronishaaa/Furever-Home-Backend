import { AppError } from "./AppError";

type ConstructorParam = {
  message?: string;
  details?: object;
};

export class UnauthenticatedError extends AppError {
  constructor({ message = "Unauthenticated", details }: ConstructorParam) {
    super(message, 401, true, details);
  }
}

export class ForbiddenError extends AppError {
  constructor({ message = "Permission denied", details }: ConstructorParam) {
    super(message, 403, true, details);
  }
}

export class NotFoundError extends AppError {
  constructor({ message = "Resource not found", details }: ConstructorParam) {
    super(message, 404, true, details);
  }
}

export class PayloadTooLargeError extends AppError {
  constructor({ message = "Resource too large", details }: ConstructorParam) {
    super(message, 413, true, details);
  }
}
