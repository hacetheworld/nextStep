import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import type { Task } from '../types';
import TaskAccordion from '../components/TaskAccordion';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayDay, setTodayDay] = useState<number | null>(null);

  const fetchTasks = async () => {
    try {
      const [tasksRes, todayRes] = await Promise.all([
        apiService.getAllTasks(),
        apiService.getTodayTask(),
      ]);
      setTasks(tasksRes.data.data);

      if (!todayRes.data.data.completed && todayRes.data.data.task) {
        setTodayDay(todayRes.data.data.task.day);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleComplete = async (taskId: string, submissionLink: string, submissionText?: string) => {
    try {
      await apiService.completeTask(taskId, submissionLink, submissionText);
      await fetchTasks(); // Refresh tasks after completion
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to complete task';
      alert(message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">All Tasks</h1>
        <p className="text-neutral-400 mt-1">
          Complete tasks sequentially — one day at a time
        </p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskAccordion
            key={task.id}
            task={task}
            isToday={task.day === todayDay}
            canSubmit={task.day === todayDay}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
