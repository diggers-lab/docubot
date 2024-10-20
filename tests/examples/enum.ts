export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

/**
 * Enum for HTTP status codes.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
 */
export enum HttpStatusCode {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

export enum ResponseStatus {
  Success = "SUCCESS",
  Failure = 0,
  Pending = 1,
}

export enum FilePermissions {
  Read = 1 << 0, // 0001
  Write = 1 << 1, // 0010
  Execute = 1 << 2, // 0100
}

export enum LogLevel {
  Debug, // 0
  Info, // 1
  Warn, // 2
  Error, // 3
}

export enum PaymentStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
  Failed = "FAILED",
}
