import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-neutral-800/50">
        <h1 className="text-2xl font-bold">
          <span className="text-yellow-400">Next</span>Step
        </h1>
        <button
          onClick={handleCTA}
          className="px-5 py-2 text-sm font-medium bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-all duration-200"
        >
          {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium mb-8">
            🚀 30 Days • MERN Fullstack
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Not sure what to study{' '}
            <span className="text-yellow-400">every day?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            This is a structured 30-day MERN roadmap designed to help you stay
            disciplined and build real fullstack skills. One task per day. No
            confusion. Just execute.
          </p>

          {/* CTA */}
          <button
            onClick={handleCTA}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold bg-yellow-400 text-black rounded-xl hover:bg-yellow-300 transition-all duration-300 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:scale-105"
          >
            Start the 30-Day Path
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[
              { value: '30', label: 'Days' },
              { value: '1', label: 'Task/Day' },
              { value: '∞', label: 'Skills' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-yellow-400">{stat.value}</p>
                <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
    </div>
  );
};

export default LandingPage;
