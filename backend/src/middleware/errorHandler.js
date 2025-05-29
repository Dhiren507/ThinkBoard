/**
 * Global error handler middleware for consistent error responses
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Default error status and message
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // For 500 errors, don't expose details in production
  const error = status === 500 && process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred' 
    : message;
  
  res.status(status).json({
    success: false,
    error,
    // Only include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
