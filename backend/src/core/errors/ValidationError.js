const AppError = require('./AppError');

/**
 * Validation Error
 * Used when request validation fails
 */
class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

module.exports = ValidationError;
