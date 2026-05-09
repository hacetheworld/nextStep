import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api.service';
import type { Progress, Task } from '../types';

const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, tasksRes] = await Promise.all([
          apiService.getProgress(),
          apiService.getAllTasks(),
        ]);
        setProgress(progressRes.data.data);
        setTasks(tasksRes.data.data);
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <h1 className="text-2xl lg:text-3xl font-bold">Your Progress</h1>
        <p className="text-neutral-400 mt-1">Track your 30-day MERN journey</p>
      </div>

      {progress && (
        <>
          {/* Progress stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Completed', value: progress.completed, color: 'text-green-400', bg: 'bg-green-400/10' },
              { label: 'Remaining', value: progress.remaining, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
              { label: 'Total Days', value: progress.total, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { label: 'Progress', value: `${progress.percentage}%`, color: 'text-purple-400', bg: 'bg-purple-400/10' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-5"
              >
                <p className="text-sm text-neutral-400 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-yellow-400 font-bold">{progress.percentage}%</span>
            </div>
            <div className="w-full h-3 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {/* Day-by-day grid */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Day by Day</h2>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  title={`Day ${task.day}: ${task.title}`}
                  className={`
                    relative flex items-center justify-center w-full aspect-square rounded-lg text-sm font-bold cursor-default transition-all duration-200
                    ${
                      task.status === 'COMPLETED'
                        ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                        : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                    }
                  `}
                >
                  {task.day}
                  {task.status === 'COMPLETED' && (
                    <span className="absolute -top-1 -right-1 text-xs">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressPage;
