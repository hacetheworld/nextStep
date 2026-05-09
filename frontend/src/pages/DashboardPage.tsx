import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { apiService } from '../services/api.service';
import type { TodayTask, Progress } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todayTask, setTodayTask] = useState<TodayTask | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskRes, progressRes] = await Promise.all([
          apiService.getTodayTask(),
          apiService.getProgress(),
        ]);
        setTodayTask(taskRes.data.data);
        setProgress(progressRes.data.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
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
    <div className="max-w-6xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Welcome back, <span className="text-yellow-400">{user?.name?.split(' ')[0]}</span>
        </h1>
        <p className="text-neutral-400 mt-1">Here's your daily progress overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Task - takes 2 cols */}
        <div className="lg:col-span-2">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:p-8 h-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">📋</span>
              <h2 className="text-lg font-semibold">Today's Task</h2>
            </div>

            {todayTask?.completed ? (
              <div className="text-center py-12">
                <p className="text-5xl mb-4">🎉</p>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">All Tasks Completed!</h3>
                <p className="text-neutral-400">You've completed the entire 30-day MERN path. Incredible!</p>
              </div>
            ) : todayTask?.task ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold">
                    Day {todayTask.task.day}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 text-xs">
                    {todayTask.task.submissionType}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{todayTask.task.title}</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">{todayTask.task.description}</p>

                {/* Focus tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(todayTask.task.focus as string[]).map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/tasks')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition-all duration-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                >
                  Continue Task
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Progress Panel - 1 col */}
        <div className="space-y-6">
          {/* Progress Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-400 text-lg">📊</span>
              <h2 className="text-lg font-semibold">Progress</h2>
            </div>

            {progress && (
              <>
                {/* Circular-style progress display */}
                <div className="text-center mb-6">
                  <div className="relative inline-flex items-center justify-center w-32 h-32">
                    <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="#262626" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="#facc15"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 52}`}
                        strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress.percentage / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold text-yellow-400">
                      {progress.percentage}%
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                    <span className="text-sm text-neutral-400">Completed</span>
                    <span className="text-sm font-semibold text-green-400">{progress.completed} days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-800">
                    <span className="text-sm text-neutral-400">Remaining</span>
                    <span className="text-sm font-semibold text-neutral-300">{progress.remaining} days</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-neutral-400">Total</span>
                    <span className="text-sm font-semibold text-neutral-300">{progress.total} days</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
