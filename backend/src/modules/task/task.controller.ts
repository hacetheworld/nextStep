import { Request, Response, NextFunction } from 'express';
import { taskService } from './task.service';

export const taskController = {
  /** GET /tasks - Get all tasks with user progress */
  getAllTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await taskService.getAllTasks(req.user!.id);
      res.json({ success: true, data: tasks });
    } catch (error) {
      next(error);
    }
  },

  /** GET /tasks/today - Get today's task */
  getTodayTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await taskService.getTodayTask(req.user!.id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  /** POST /tasks/:taskId/complete - Complete a task */
  completeTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.taskId as string;
      const { submissionLink, submissionText } = req.body;

      const result = await taskService.completeTask(
        req.user!.id,
        taskId,
        submissionLink,
        submissionText
      );

      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },
};
