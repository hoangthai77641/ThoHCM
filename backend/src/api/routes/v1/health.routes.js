const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getRedisClient } = require('../../../config/redis');

/**
 * @route   GET /api/health
 * @desc    Basic health check endpoint
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * @route   GET /api/ready
 * @desc    Readiness check - checks if app is ready to serve traffic
 * @access  Public
 */
router.get('/ready', async (req, res) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown',
      redis: 'unknown',
    },
  };

  // Check MongoDB connection
  try {
    if (mongoose.connection.readyState === 1) {
      checks.checks.database = 'connected';
    } else {
      checks.checks.database = 'disconnected';
      checks.status = 'degraded';
    }
  } catch (error) {
    checks.checks.database = 'error';
    checks.status = 'degraded';
  }

  // Check Redis connection
  try {
    const redisClient = getRedisClient();
    if (redisClient && redisClient.status === 'ready') {
      checks.checks.redis = 'connected';
    } else {
      checks.checks.redis = 'disconnected';
      checks.status = 'degraded';
    }
  } catch (error) {
    checks.checks.redis = 'error';
    checks.status = 'degraded';
  }

  const statusCode = checks.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(checks);
});

module.exports = router;
