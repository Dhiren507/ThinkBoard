# ThinkBoard Project Setup Instructions

This document contains instructions for setting up and running your ThinkBoard project.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Update the `.env` file with your actual values:
   - Set `MONGODB_URI` to your MongoDB connection string
   - Add a strong `JWT_SECRET` for authentication
   - Add Upstash Redis credentials if using rate limiting
   - Add your Gemini API key (after following the steps in GEMINI_INTEGRATION.md)

5. Start the backend server:

```bash
npm run dev
```

The server should start on http://localhost:3000

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend should start on http://localhost:5173

## Features Implemented

- User authentication (register, login, protected routes)
- Note management (create, read, update, delete)
- Gemini AI writing assistant
- Rate limiting
- Modern UI with Tailwind CSS and DaisyUI

## Testing the Application

1. Register a new account
2. Log in with your credentials
3. Create a new note (try the AI writing assistant!)
4. View, edit, and delete your notes

## Additional Configuration

For production deployment, you may need to:
1. Set up a production MongoDB database
2. Configure proper environment variables for production
3. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
   ```
4. Serve the static files from the backend or a CDN
