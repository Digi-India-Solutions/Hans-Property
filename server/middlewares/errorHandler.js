// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Set default error status and message
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: message,
    });
};

module.exports = errorHandler;
