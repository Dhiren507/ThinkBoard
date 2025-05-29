# ThinkBoard Deployment Guide

This document outlines the steps required to deploy the ThinkBoard application to a production environment.

## Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (Atlas or self-hosted)
- Google Gemini API key
- Hosting provider for frontend and backend (e.g., Vercel, Netlify, Heroku, etc.)

## Backend Deployment

### 1. Set Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Build and Start the Server

```bash
npm run prod
```

### Deploying to Cloud Providers

#### Heroku

1. Create a Procfile in the root of the backend directory:
```
web: npm run prod
```

2. Set environment variables in Heroku dashboard
3. Deploy using Heroku CLI or GitHub integration

#### Railway/Render

1. Point to the backend directory
2. Set build command: `npm install`
3. Set start command: `npm run prod`
4. Configure environment variables in the provider dashboard

## Frontend Deployment

### 1. Set Environment Variables

Create a `.env.production` file in the `frontend` directory:

```
VITE_API_URL=https://your-backend-api-url
```

### 2. Build the Frontend

```bash
cd frontend
npm install
npm run build
```

This will generate a `dist` folder with static assets.

### 3. Deploy to Static Hosting

#### Vercel or Netlify

1. Connect your repository
2. Set the build command: `npm run build`
3. Set the publish directory: `dist`
4. Set environment variables in the provider dashboard

## Post-Deployment Checklist

1. Verify API connectivity
2. Test authentication flow
3. Confirm Gemini AI integration works
4. Test ThinkMate chat functionality
5. Verify theme switching works
6. Monitor error rates and performance

## Monitoring and Maintenance

- Use the `/api/health` endpoints to monitor application status
- Set up alerts for error rates and API failures
- Regularly update dependencies to patch security vulnerabilities

## Troubleshooting

- Check logs for error messages
- Verify environment variables are correctly set
- Ensure database connection is working
- Test API endpoints individually

For more detailed information, please refer to the documentation of your chosen hosting providers.
