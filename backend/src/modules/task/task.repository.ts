import prisma from '../../config/database';
import { TaskStatus } from '@prisma/client';

export const taskRepository = {
  /** Get all tasks ordered by day */
  findAll: async () => {
    return prisma.task.findMany({ orderBy: { day: 'asc' } });
  },

  /** Get all user tasks with task details for a user */
  findUserTasks: async (userId: string) => {
    return prisma.userTask.findMany({
      where: { userId },
      include: { task: true },
      orderBy: { task: { day: 'asc' } },
    });
  },

  /** Get the first pending task for a user (today's task) */
  findTodayTask: async (userId: string) => {
    return prisma.userTask.findFirst({
      where: { userId, status: TaskStatus.PENDING },
      include: { task: true },
      orderBy: { task: { day: 'asc' } },
    });
  },

  /** Find a specific user task */
  findUserTask: async (userId: string, taskId: string) => {
    return prisma.userTask.findUnique({
      where: { userId_taskId: { userId, taskId } },
      include: { task: true },
    });
  },

  /** Check if any task before this one is still pending */
  hasPendingTaskBefore: async (userId: string, day: number) => {
    const count = await prisma.userTask.count({
      where: {
        userId,
        status: TaskStatus.PENDING,
        task: { day: { lt: day } },
      },
    });
    return count > 0;
  },

  /** Mark a user task as completed */
  completeTask: async (
    userId: string,
    taskId: string,
    submissionLink: string,
    submissionText?: string
  ) => {
    return prisma.userTask.update({
      where: { userId_taskId: { userId, taskId } },
      data: {
        status: TaskStatus.COMPLETED,
        submissionLink,
        submissionText,
        completedAt: new Date(),
      },
      include: { task: true },
    });
  },

  /** Assign all tasks to a user (called on first login) */
  assignAllTasksToUser: async (userId: string) => {
    const tasks = await prisma.task.findMany({ orderBy: { day: 'asc' } });

    const userTasks = tasks.map((task) => ({
      userId,
      taskId: task.id,
      status: TaskStatus.PENDING,
    }));

    return prisma.userTask.createMany({ data: userTasks });
  },

  /** Count completed tasks for a user */
  countCompleted: async (userId: string) => {
    return prisma.userTask.count({
      where: { userId, status: TaskStatus.COMPLETED },
    });
  },

  /** Count total tasks for a user */
  countTotal: async (userId: string) => {
    return prisma.userTask.count({ where: { userId } });
  },
};
