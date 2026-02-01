const Joi = require('joi');
const { objectIdSchema } = require('./schemas/common.schema');

/**
 * Validate booking creation
 */
const validateCreateBooking = Joi.object({
  serviceId: objectIdSchema.required(),
  scheduledDate: Joi.date().iso().min('now').required().messages({
    'date.min': 'Scheduled date must be in the future',
  }),
  address: Joi.object({
    street: Joi.string().required(),
    ward: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required(),
    }).optional(),
  }).required(),
  notes: Joi.string().max(500).optional(),
  estimatedDuration: Joi.number().min(1).optional(),
});

/**
 * Validate booking update
 */
const validateUpdateBooking = Joi.object({
  status: Joi.string()
    .valid('pending', 'confirmed', 'in-progress', 'completed', 'cancelled')
    .optional(),
  scheduledDate: Joi.date().iso().optional(),
  notes: Joi.string().max(500).optional(),
  workerId: objectIdSchema.optional(),
});

/**
 * Validate booking query parameters
 */
const validateBookingQuery = Joi.object({
  status: Joi.string()
    .valid('pending', 'confirmed', 'in-progress', 'completed', 'cancelled')
    .optional(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
  sortBy: Joi.string().valid('createdAt', 'scheduledDate', 'updatedAt').default('createdAt'),
  order: Joi.string().valid('asc', 'desc').default('desc'),
});

module.exports = {
  validateCreateBooking,
  validateUpdateBooking,
  validateBookingQuery,
};
