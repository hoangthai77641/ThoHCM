const AppError = require('./AppError');

/**
 * Not Found Error
 * Used when a resource is not found
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

module.exports = NotFoundError;
