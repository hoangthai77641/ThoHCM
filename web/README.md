# ThoHCM Web Frontend

Modern web application built with React and Vite for the ThoHCM platform.

## Features

- 🎨 Modern UI with Material-UI components
- ⚡ Fast development with Vite
- 🔐 JWT authentication
- 🌐 Internationalization support
- 📱 Responsive design
- 🔄 Real-time updates via Socket.IO

## Prerequisites

- Node.js 16+
- npm or yarn

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Configuration

Edit `.env` file with your settings:

```env
VITE_API_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
# ... other Firebase config
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
web/
├── public/              # Static assets
├── src/                 # Source code
├── tools/               # Development tools
├── .env.example         # Environment template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## Legacy Note

Dịch vụ điện lạnh - ReactJS
- Đặt lịch, xem dịch vụ, realtime với backend
