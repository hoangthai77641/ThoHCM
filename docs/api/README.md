# ThoHCM API Documentation

## Overview

ThoHCM provides a RESTful API for managing home repair services, bookings, users, and more.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.thohcm.com/api`

## Interactive Documentation

Swagger UI documentation is available at:
- **Development**: http://localhost:5000/api-docs
- **Production**: https://api.thohcm.com/api-docs

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

```bash
# Login with phone and password
POST /api/auth/login
Content-Type: application/json

{
  "phone": "0123456789",
  "password": "your-password"
}

# Response
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "...",
    "role": "customer"
  }
}
```

## API Endpoints

### Health & Status

- `GET /api/health` - Basic health check
- `GET /api/ready` - Readiness check (includes DB and Redis status)

### Authentication

- `POST /api/auth/login` - Login with phone and password
- `POST /api/auth/register` - Register new user
- `POST /api/auth/request-otp` - Request OTP for phone verification
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID (admin)
- `GET /api/users` - List all users (admin)

### Services

- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Bookings

- `GET /api/bookings` - List user's bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `POST /api/bookings/:id/complete` - Mark booking as complete
- `POST /api/bookings/:id/assign` - Assign worker to booking (admin)

### Reviews

- `GET /api/reviews` - List reviews
- `GET /api/reviews/:id` - Get review details
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Notifications

- `GET /api/notifications` - List user notifications
- `GET /api/notifications/unread` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Wallet & Payments

- `GET /api/wallet/balance` - Get wallet balance
- `POST /api/wallet/deposit` - Deposit funds
- `POST /api/wallet/withdraw` - Withdraw funds
- `GET /api/wallet/transactions` - List transactions

## Request & Response Format

### Successful Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    {
      "field": "phone",
      "message": "Phone number is required"
    }
  ]
}
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Rate Limiting

API requests are rate-limited to prevent abuse:
- **Anonymous**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes
- **Static files**: 200 requests per 15 minutes

## Pagination

List endpoints support pagination:

```
GET /api/bookings?page=1&limit=10&sortBy=createdAt&order=desc
```

Response includes pagination info:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Filtering & Sorting

Most list endpoints support filtering:

```
GET /api/bookings?status=pending&date=2024-01-01
GET /api/services?category=electrical&minPrice=100
```

## WebSocket (Socket.IO)

Real-time updates via Socket.IO:

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: {
    token: 'your-jwt-token'
  }
});

// Listen for booking updates
socket.on('booking:updated', (booking) => {
  console.log('Booking updated:', booking);
});

// Listen for new notifications
socket.on('notification:new', (notification) => {
  console.log('New notification:', notification);
});
```

## Error Handling

The API uses standard HTTP status codes and returns consistent error responses. All errors include:
- `success: false`
- `error`: Error message
- `errors`: Array of validation errors (if applicable)

## Support

For API support:
- Email: api-support@thohcm.com
- GitHub Issues: https://github.com/hoangthai77641/ThoHCM/issues
- Documentation: https://docs.thohcm.com

## Version History

- **v1.0.0** (2024-01-01): Initial API release
- Clean Architecture restructuring
- Health check endpoints
- Swagger documentation
