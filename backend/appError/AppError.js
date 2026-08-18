class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Marks the error as a known operational error

    // Captures the stack trace and excludes this constructor from it
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;