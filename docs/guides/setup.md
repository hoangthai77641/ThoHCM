# Development Setup Guide

This guide will help you set up the ThoHCM development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16 or higher ([Download](https://nodejs.org/))
- **npm**: Version 7 or higher (comes with Node.js)
- **MongoDB**: Version 4.4 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Redis**: Version 6 or higher (optional, for caching) ([Download](https://redis.io/download))
- **Git**: For version control ([Download](https://git-scm.com/))
- **Docker** (Optional): For containerized development ([Download](https://www.docker.com/))

## Quick Start with Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/hoangthai77641/ThoHCM.git
cd ThoHCM

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

This will start:
- Backend API (http://localhost:5000)
- MongoDB (port 27017)
- Redis (port 6379)
- Mongo Express (http://localhost:8081)

## Manual Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hoangthai77641/ThoHCM.git
cd ThoHCM
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env  # or use your preferred editor

# Start MongoDB (if not using Docker)
# On macOS with Homebrew:
brew services start mongodb-community

# On Ubuntu:
sudo systemctl start mongod

# Start Redis (optional)
# On macOS:
brew services start redis

# On Ubuntu:
sudo systemctl start redis

# Run database seeder (optional)
npm run seed

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 3. Web Frontend Setup

```bash
# Open a new terminal
cd web

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env

# Start development server
npm run dev
```

The web app will be available at `http://localhost:3000`

### 4. Mobile Setup (Optional)

For Flutter mobile app development:

```bash
cd mobile/worker_app

# Install Flutter dependencies
flutter pub get

# Run on connected device/emulator
flutter run
```

## Environment Configuration

### Backend (.env)

Key environment variables to configure:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/thohcm

# JWT
JWT_SECRET=your-secret-key-here

# SMS Provider
SMS_PROVIDER=mock
SMS_TEST_PHONES=0123456789

# Client
CLIENT_URL=http://localhost:3000

# Google Cloud Storage (optional)
GCS_BUCKET_NAME=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=./config/credentials.json
```

### Web Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
```

## Verify Installation

### 1. Check Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.45,
  "environment": "development"
}
```

### 2. Check Database Connection

```bash
curl http://localhost:5000/api/ready
```

### 3. Access API Documentation

Open your browser and navigate to:
```
http://localhost:5000/api-docs
```

## Development Workflow

### Running Tests

```bash
# Backend tests
cd backend
npm run test

# Run specific test file
npm run test -- path/to/test.js

# Watch mode
npm run test:watch

# Coverage report
npm run test -- --coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Database Operations

```bash
# Seed database with sample data
npm run seed

# Bootstrap initial data
npm run bootstrap

# Check Atlas connection
npm run check:atlas
```

## Common Issues

### Port Already in Use

If port 5000 or 3000 is already in use:

```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### MongoDB Connection Error

```bash
# Check MongoDB status
# macOS:
brew services list

# Ubuntu:
sudo systemctl status mongod

# Restart MongoDB
# macOS:
brew services restart mongodb-community

# Ubuntu:
sudo systemctl restart mongod
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Permission Errors

```bash
# Fix npm permissions
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER .
```

## IDE Setup

### VS Code

Recommended extensions:
- ESLint
- Prettier
- Docker
- GitLens
- MongoDB for VS Code
- Thunder Client (API testing)

Settings (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.autoFixOnSave": true
}
```

## Next Steps

- Read the [Architecture Documentation](../docs/architecture/backend-architecture.md)
- Check out the [Contributing Guide](../CONTRIBUTING.md)
- Explore the [API Documentation](http://localhost:5000/api-docs)
- Join our community discussions

## Getting Help

- Create an issue on GitHub
- Check existing documentation
- Ask in community discussions

Happy coding! 🚀
