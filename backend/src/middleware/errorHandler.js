export const errorHandler = (err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found with the specified ID';
  }
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field}. Please use a different value.`;
  }
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};