import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';

interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

/** Verifies JWT token and attaches user to request */
export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    console.log(config.jwt, "jwtttttttttttttttt")
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    logger.error('Auth failure', {
      correlationId: req.correlationId,
      error: (error as Error).message,
    });

    next(new AppError('Invalid or expired token', 401));
  }
};
