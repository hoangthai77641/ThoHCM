# ThoHCM Backend Architecture

## Overview
ThoHCM Backend follows Clean Architecture principles, ensuring separation of concerns, testability, and maintainability.

## Architecture Layers

### 1. API Layer (`src/api`)
The outermost layer that handles HTTP requests and responses.

#### Components:
- **Routes** (`routes/`): Define API endpoints and route handlers
  - `v1/`: Version 1 API endpoints
  - `v2/`: Version 2 API endpoints (future)
- **Controllers** (`controllers/`): Handle HTTP requests, call services, return responses
- **Middlewares** (`middlewares/`): Request/response processing (auth, validation, error handling)
- **Validators** (`validators/`): Request validation schemas using Joi

### 2. Core Layer (`src/core`)
Contains business-agnostic functionality used across the application.

#### Components:
- **Config** (`config/`): Application configuration
  - Database configuration
  - Socket.IO configuration
  - Firebase configuration
  - Environment variables
- **Constants** (`constants/`): Application constants
- **Errors** (`errors/`): Custom error classes
  - `AppError`: Base error class
  - `ValidationError`: Validation failures
  - `AuthenticationError`: Auth failures
  - `NotFoundError`: Resource not found

### 3. Domain Layer (`src/domain`)
Contains business logic and domain models.

#### Components:
- **Models** (`models/`): Mongoose schemas and models
- **Repositories** (`repositories/`): Data access layer
  - Abstract database operations
  - Implement repository pattern
- **Services** (`services/`): Business logic
  - SMS services
  - Payment services
  - Notification services

### 4. Infrastructure Layer (`src/infrastructure`)
Contains external service integrations and technical implementations.

#### Components:
- **Database** (`database/`): Database connection and seeders
- **Socket** (`socket/`): Socket.IO implementation
- **Storage** (`storage/`): File storage (GCS, local)
- **Cache** (`cache/`): Redis caching implementation

### 5. Utils Layer (`src/utils`)
Utility functions and helpers.

#### Components:
- **Logger** (`logger/`): Winston logging implementation
- **Helpers** (`helpers/`): Utility functions
- **Validation** (`validation/`): Common validation utilities

## Data Flow

```
Request → Route → Middleware → Controller → Service → Repository → Database
                                                ↓
                                            Response
```

1. **Request** enters through a route
2. **Middlewares** process the request (auth, validation)
3. **Controller** receives validated request
4. **Service** implements business logic
5. **Repository** handles data access
6. **Database** stores/retrieves data
7. **Response** flows back through the layers

## Design Patterns

### Repository Pattern
Abstracts data access logic:
```javascript
class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  
  async findByPhone(phone) {
    return this.model.findOne({ phone });
  }
}
```

### Service Pattern
Encapsulates business logic:
```javascript
class BookingService {
  async createBooking(userId, bookingData) {
    // Business logic here
    const booking = await bookingRepository.create({...});
    await notificationService.sendBookingConfirmation(...);
    return booking;
  }
}
```

### Dependency Injection
Services receive dependencies through constructor:
```javascript
class BookingController {
  constructor(bookingService, userService) {
    this.bookingService = bookingService;
    this.userService = userService;
  }
}
```

## Error Handling

Centralized error handling using custom error classes:

```javascript
// Throwing errors
throw new NotFoundError('User not found');
throw new ValidationError('Invalid data', errors);

// Error middleware catches and formats
app.use(errorHandler);
```

## Logging

Structured logging with Winston:

```javascript
logger.info('User created', { userId, phone });
logger.error('Payment failed', { error, orderId });
```

## Security

- **Helmet**: Security headers
- **Rate Limiting**: Prevent abuse
- **CORS**: Cross-origin control
- **Input Validation**: Joi schemas
- **Sanitization**: MongoDB injection prevention

## Testing Strategy

- **Unit Tests**: Test individual functions
- **Integration Tests**: Test API endpoints
- **E2E Tests**: Test complete workflows

## API Versioning

Routes are versioned to maintain backward compatibility:
- `/api/v1/*` - Current stable API
- `/api/v2/*` - Future version

## Health Checks

- `/api/health` - Basic health check
- `/api/ready` - Readiness check (database, redis)

## Documentation

API documentation available via Swagger UI:
- Development: `http://localhost:5000/api-docs`
- Production: `https://api.thohcm.com/api-docs`
