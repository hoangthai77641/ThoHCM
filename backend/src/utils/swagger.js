const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ThoHCM API Documentation',
      version: '1.0.0',
      description: 'API documentation for ThoHCM - Home Services Platform',
      contact: {
        name: 'ThoHCM Team',
        email: 'support@thohcm.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://api.thohcm.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './routes/**/*.js',
    './src/api/routes/**/*.js',
    './controllers/**/*.js',
    './src/api/controllers/**/*.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
