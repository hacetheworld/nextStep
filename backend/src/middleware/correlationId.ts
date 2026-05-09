import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/** Attaches a unique correlation ID to every request for traceability */
export const correlationId = (req: Request, _res: Response, next: NextFunction) => {
  req.correlationId = req.headers['x-correlation-id'] as string || uuidv4();
  next();
};

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}
