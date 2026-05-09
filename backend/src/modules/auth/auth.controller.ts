import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export const authController = {
  /** POST /auth/google - Login with Google credential */
  googleLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { credential } = req.body;
      const result = await authService.googleLogin(credential);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  /** GET /auth/me - Get current user */
  getMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getMe(req.user!.id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
