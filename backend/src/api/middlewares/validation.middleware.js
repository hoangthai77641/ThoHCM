const { ValidationError } = require('../../core/errors');

/**
 * Validation Middleware
 * Validates request data against a Joi schema
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return next(new ValidationError('Validation failed', errors));
    }

    // Replace the request property with validated and sanitized value
    req[property] = value;
    next();
  };
};

module.exports = validate;
