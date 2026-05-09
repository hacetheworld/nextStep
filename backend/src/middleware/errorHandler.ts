import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

/** Centralized error handler - returns standardized error response */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const correlationId = req.correlationId || 'unknown';

  if (err instanceof AppError) {
    // Operational errors - expected, log only if server error
    if (err.statusCode >= 500) {
      logger.error(err.message, {
        correlationId,
        stack: err.stack,
      });
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      correlationId,
    });
    return;
  }

  // Unexpected errors - always log
  logger.error('Unexpected error', {
    correlationId,
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    correlationId,
  });
};
