const ThrowError = require('../utils/throwError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // TypeError that id is not found
  if (err.name === 'TypeError') {
    const message = `Resource not found`;
    error = new ThrowError(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
