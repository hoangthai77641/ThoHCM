const Joi = require('joi');
const { phoneSchema, passwordSchema } = require('./schemas/common.schema');

/**
 * Validate phone number and password for login
 */
const validateLogin = Joi.object({
  phone: phoneSchema.required(),
  password: passwordSchema.required(),
});

/**
 * Validate phone number for OTP request
 */
const validateOTPRequest = Joi.object({
  phone: phoneSchema.required(),
});

/**
 * Validate OTP verification
 */
const validateOTPVerification = Joi.object({
  phone: phoneSchema.required(),
  otp: Joi.string().length(6).required().messages({
    'string.length': 'OTP must be 6 digits',
  }),
});

/**
 * Validate user registration
 */
const validateRegister = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: phoneSchema.required(),
  password: passwordSchema.required(),
  email: Joi.string().email().optional(),
  role: Joi.string().valid('customer', 'worker').default('customer'),
});

module.exports = {
  validateLogin,
  validateOTPRequest,
  validateOTPVerification,
  validateRegister,
};
