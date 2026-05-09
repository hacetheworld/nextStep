import { Request, Response, NextFunction } from 'express';
import { progressService } from './progress.service';

export const progressController = {
  /** GET /progress - Get user's progress */
  getProgress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const progress = await progressService.getProgress(req.user!.id);
      res.json({ success: true, data: progress });
    } catch (error) {
      next(error);
    }
  },
};
