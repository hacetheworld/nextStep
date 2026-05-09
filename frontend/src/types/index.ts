export interface User {
  id: string;
  email: string;
  name: string;
  googleId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  day: number;
  title: string;
  description: string;
  focus: string[];
  steps: string[];
  successCriteria: string[];
  submissionType: string;
  status: 'PENDING' | 'COMPLETED';
  submissionLink?: string;
  submissionText?: string;
  completedAt?: string;
}

export interface TodayTask {
  completed: boolean;
  message?: string;
  task?: Task;
}

export interface Progress {
  completed: number;
  total: number;
  remaining: number;
  percentage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  correlationId?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
