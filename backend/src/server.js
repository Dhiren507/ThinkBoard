import express from 'express';
import connectDB from './database/db.js';
import notesRoutes from './routes/notes.routes.js';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
import healthRoutes from './routes/health.routes.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';
// Additional security packages
import helmet from 'helmet';
import compression from 'compression';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;


// Security middleware
app.use(helmet()); // Helps secure Express apps with various HTTP headers
app.use(compression()); // Compress responses

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? [
          "https://thinkboardd.netlify.app",
          process.env.FRONTEND_URL
        ].filter(Boolean)
      : ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/health", healthRoutes);


// Global error handling middleware - should be after all routes
app.use(errorHandler);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found' 
  });
});

// Connect to database and start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    
    // Graceful shutdown handling
    const shutdown = () => {
      console.log('Shutting down server gracefully...');
      server.close(() => {
        console.log('HTTP server closed.');
        // Close database connection and other resources
        process.exit(0);
      });
      
      // Force close if graceful shutdown takes too long
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };
    
    // Handle termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });