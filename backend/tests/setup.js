/**
 * Jest Setup File
 * Runs before all tests
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb://localhost:27017/thohcm-test';

// Increase test timeout for integration tests
jest.setTimeout(30000);

// Mock console methods in tests to reduce noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Global test utilities
global.testUtils = {
  /**
   * Generate a valid MongoDB ObjectId
   */
  generateObjectId: () => {
    return '507f1f77bcf86cd799439011';
  },

  /**
   * Generate a random phone number
   */
  generatePhone: () => {
    const prefix = ['090', '091', '093', '094', '096', '097', '098', '099'];
    const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
    const randomNumber = Math.floor(Math.random() * 10000000)
      .toString()
      .padStart(7, '0');
    return randomPrefix + randomNumber;
  },

  /**
   * Wait for a specified time
   */
  wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
};

// Clean up after all tests
afterAll(async () => {
  // Add any cleanup logic here
  await new Promise((resolve) => setTimeout(resolve, 500));
});
