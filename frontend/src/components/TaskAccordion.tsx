import React, { useState } from 'react';
import type { Task } from '../types';

interface TaskAccordionProps {
  task: Task;
  isToday: boolean;
  canSubmit: boolean;
  onComplete: (taskId: string, submissionLink: string, submissionText?: string) => Promise<void>;
}

const TaskAccordion: React.FC<TaskAccordionProps> = ({ task, isToday, canSubmit, onComplete }) => {
  const [isOpen, setIsOpen] = useState(isToday);
  const [showSteps, setShowSteps] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isCompleted = task.status === 'COMPLETED';
  const isLocked = !canSubmit && !isCompleted;

  const handleSubmit = async () => {
    if (!submissionLink.trim()) return;
    setSubmitting(true);
    try {
      await onComplete(task.id, submissionLink, submissionText || undefined);
      setSubmissionLink('');
      setSubmissionText('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`
        rounded-xl border transition-all duration-300
        ${isCompleted
          ? 'bg-neutral-900/50 border-green-500/20'
          : isToday
            ? 'bg-neutral-900 border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.05)]'
            : 'bg-neutral-900 border-neutral-800'
        }
      `}
    >
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
      >
        <div className="flex items-center gap-4">
          {/* Day badge */}
          <span
            className={`
              flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold
              ${isCompleted
                ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                : isToday
                  ? 'bg-yellow-400 text-black'
                  : 'bg-neutral-800 text-neutral-400'
              }
            `}
          >
            {isCompleted ? '✓' : task.day}
          </span>

          <div>
            <h3 className={`font-semibold ${isCompleted ? 'text-neutral-400' : 'text-white'}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {isToday && !isCompleted && (
                <span className="px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-medium">
                  Today
                </span>
              )}
              {isCompleted && (
                <span className="px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 text-xs font-medium">
                  Completed
                </span>
              )}
              <span className="text-xs text-neutral-500">Day {task.day}</span>
            </div>
          </div>
        </div>

        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="px-4 lg:px-5 pb-5 border-t border-neutral-800 pt-4">
          {/* Description */}
          <p className="text-neutral-400 mb-4 leading-relaxed">{task.description}</p>

          {/* Focus tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(task.focus as string[]).map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Steps (inline expand) */}
          <div className="mb-4">
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <span>👁️</span>
              {showSteps ? 'Hide Steps' : 'View Steps'}
            </button>
            {showSteps && (
              <div className="mt-3 pl-4 border-l-2 border-yellow-400/20 space-y-2">
                {(task.steps as string[]).map((step, i) => (
                  <p key={i} className="text-sm text-neutral-300">
                    <span className="text-yellow-400 font-bold mr-2">{i + 1}.</span>
                    {step}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Success Criteria (inline expand) */}
          <div className="mb-6">
            <button
              onClick={() => setShowCriteria(!showCriteria)}
              className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              <span>✔️</span>
              {showCriteria ? 'Hide Success Criteria' : 'What success looks like'}
            </button>
            {showCriteria && (
              <div className="mt-3 pl-4 border-l-2 border-green-400/20 space-y-2">
                {(task.successCriteria as string[]).map((criteria, i) => (
                  <p key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    {criteria}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Submission section */}
          {isCompleted ? (
            <div className="bg-green-400/5 border border-green-400/20 rounded-xl p-4">
              <p className="text-sm text-green-400 font-medium mb-2">✅ Task Completed</p>
              {task.submissionLink && (
                <a
                  href={task.submissionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline break-all"
                >
                  {task.submissionLink}
                </a>
              )}
              {task.submissionText && (
                <p className="text-sm text-neutral-400 mt-2">{task.submissionText}</p>
              )}
            </div>
          ) : (
            <div className={`space-y-3 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
              {isLocked && (
                <p className="text-sm text-neutral-500 italic">
                  🔒 Complete previous tasks first
                </p>
              )}

              <div>
                <label className="block text-sm text-neutral-400 mb-1">GitHub Link *</label>
                <input
                  type="url"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-yellow-400/50 transition-colors"
                  disabled={isLocked}
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">Explanation (optional)</label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  placeholder="Describe what you did, challenges faced..."
                  rows={3}
                  className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                  disabled={isLocked}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLocked || submitting || !submissionLink.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  '✅ Mark as Done'
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskAccordion;
