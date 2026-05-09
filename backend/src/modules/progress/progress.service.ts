import { taskRepository } from '../task/task.repository';

export const progressService = {
  /** Get user progress stats */
  getProgress: async (userId: string) => {
    const [completed, total] = await Promise.all([
      taskRepository.countCompleted(userId),
      taskRepository.countTotal(userId),
    ]);

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      remaining: total - completed,
      percentage,
    };
  },
};
