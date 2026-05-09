import { taskRepository } from './task.repository';
import { AppError } from '../../utils/AppError';

export const taskService = {
  /** Get all tasks with user progress info */
  getAllTasks: async (userId: string) => {
    const userTasks = await taskRepository.findUserTasks(userId);

    return userTasks.map((ut) => ({
      id: ut.task.id,
      day: ut.task.day,
      title: ut.task.title,
      description: ut.task.description,
      focus: ut.task.focus,
      steps: ut.task.steps,
      successCriteria: ut.task.successCriteria,
      submissionType: ut.task.submissionType,
      status: ut.status,
      submissionLink: ut.submissionLink,
      submissionText: ut.submissionText,
      completedAt: ut.completedAt,
    }));
  },

  /** Get today's task (first pending) */
  getTodayTask: async (userId: string) => {
    const todayTask = await taskRepository.findTodayTask(userId);

    if (!todayTask) {
      return { completed: true, message: 'All tasks completed! 🎉' };
    }

    return {
      completed: false,
      task: {
        id: todayTask.task.id,
        day: todayTask.task.day,
        title: todayTask.task.title,
        description: todayTask.task.description,
        focus: todayTask.task.focus,
        steps: todayTask.task.steps,
        successCriteria: todayTask.task.successCriteria,
        submissionType: todayTask.task.submissionType,
        status: todayTask.status,
      },
    };
  },

  /** Complete a task with submission */
  completeTask: async (
    userId: string,
    taskId: string,
    submissionLink: string,
    submissionText?: string
  ) => {
    // Check task exists and belongs to user
    const userTask = await taskRepository.findUserTask(userId, taskId);
    if (!userTask) {
      throw new AppError('Task not found', 404);
    }

    // Already completed
    if (userTask.status === 'COMPLETED') {
      throw new AppError('Task already completed', 400);
    }

    // Check if previous tasks are done (sequential completion rule)
    const hasPending = await taskRepository.hasPendingTaskBefore(
      userId,
      userTask.task.day
    );
    if (hasPending) {
      throw new AppError('Complete previous tasks first', 400);
    }

    const completed = await taskRepository.completeTask(
      userId,
      taskId,
      submissionLink,
      submissionText
    );

    return completed;
  },
};
