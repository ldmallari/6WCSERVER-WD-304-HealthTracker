# Health Tracker

A comprehensive health and wellness tracking application built with Vue.js and Express.js.

## Project Structure

```
FinalProj/
├── client/          # Vue.js frontend application
│   ├── .env.example # Client environment variables template
│   └── ...
├── server/          # Express.js backend API
│   ├── .env         # Server environment variables (create from .env.example)
│   ├── .env.example # Server environment variables template
│   └── ...
├── .gitignore      # Git ignore rules
└── package.json    # Root package.json for managing both apps
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Set up environment variables:
   ```bash
   # Copy and configure server environment
   cp server/.env.example server/.env
   # Edit server/.env with your actual values
   
   # Copy and configure client environment (optional)
   cp client/.env.example client/.env
   # Edit client/.env if you need custom API URL
   ```
3. Install dependencies for both client and server:
   ```bash
   npm run install-all
   ```

### Development

Run both client and server in development mode:
```bash
npm run dev
```

Or run them separately:
```bash
# Run server only
npm run server

# Run client only  
npm run client
```

### Production

Build the client:
```bash
npm run build
```

Start the server:
```bash
npm start
```

## Features

- User authentication and profiles
- Health log tracking (exercise, sleep, water, weight, mood, meals)
- Interactive reports and analytics
- Health articles and tips
- Responsive design with Tailwind CSS