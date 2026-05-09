import React from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { apiService } from '../services/api.service';

const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) return;

      const { data } = await apiService.googleLogin(credentialResponse.credential);
      login(data.data.token, data.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        {/* Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome to <span className="text-yellow-400">Next</span>Step
            </h1>
            <p className="text-neutral-400">
              Sign in to start your 30-day MERN journey
            </p>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.error('Google Login Failed')}
              theme="filled_black"
              shape="rectangular"
              size="large"
              text="continue_with"
              width="320"
            />
          </div>

          {/* Footer */}
          <p className="text-xs text-neutral-500 text-center mt-6">
            By continuing, you agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
