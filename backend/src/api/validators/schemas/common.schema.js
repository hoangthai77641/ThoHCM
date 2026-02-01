const Joi = require('joi');

/**
 * Phone number validation (Vietnamese format)
 */
const phoneSchema = Joi.string()
  .pattern(/^(0|\+84)[0-9]{9}$/)
  .messages({
    'string.pattern.base': 'Phone number must be a valid Vietnamese phone number',
  });

/**
 * Email validation
 */
const emailSchema = Joi.string().email().messages({
  'string.email': 'Email must be a valid email address',
});

/**
 * Password validation
 */
const passwordSchema = Joi.string().min(6).messages({
  'string.min': 'Password must be at least 6 characters long',
});

/**
 * MongoDB ObjectId validation
 */
const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    'string.pattern.base': 'Invalid ID format',
  });

module.exports = {
  phoneSchema,
  emailSchema,
  passwordSchema,
  objectIdSchema,
};
