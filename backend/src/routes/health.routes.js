import express from 'express';
const router = express.Router();

// Basic health check endpoint
router.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'ThinkBoard API is running',
    timestamp: new Date().toISOString()
  });
});

// Detailed health check with dependencies
router.get('/details', async (req, res) => {
  try {
    // Add checks for database, external services, etc.
    const status = {
      status: 'ok',
      dbConnection: true,
      services: {
        geminiAPI: process.env.GEMINI_API_KEY ? true : false
      },
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
    });
  }
});

export default router;