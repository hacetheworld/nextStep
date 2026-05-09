import api from '../api/axios';
import type { ApiResponse, AuthResponse, Task, TodayTask, Progress, User } from '../types';

/** All API calls go through this service - components never call axios directly */
export const apiService = {
  // Auth
  googleLogin: (credential: string) =>
    api.post<ApiResponse<AuthResponse>>('/auth/google', { credential }),

  getMe: () =>
    api.get<ApiResponse<User>>('/auth/me'),

  // Tasks
  getAllTasks: () =>
    api.get<ApiResponse<Task[]>>('/tasks'),

  getTodayTask: () =>
    api.get<ApiResponse<TodayTask>>('/tasks/today'),

  completeTask: (taskId: string, submissionLink: string, submissionText?: string) =>
    api.post<ApiResponse<Task>>(`/tasks/${taskId}/complete`, {
      submissionLink,
      submissionText,
    }),

  // Progress
  getProgress: () =>
    api.get<ApiResponse<Progress>>('/progress'),
};
