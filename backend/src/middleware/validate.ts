import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { AppError } from '../utils/AppError';

/**
 * Creates a validation middleware for the request body using a Yup schema.
 * Use in routes: router.post('/path', validate(schema), controller)
 */
export const validate = (schema: AnySchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (error: any) {
      const messages = error.errors?.join(', ') || 'Validation failed';
      next(new AppError(messages, 400));
    }
  };
};
