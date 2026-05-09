import axios from 'axios';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { authRepository } from './auth.repository';
import { taskRepository } from '../task/task.repository';
import { AppError } from '../../utils/AppError';
import logger from '../../utils/logger';

interface GoogleTokenPayload {
  sub: string;
  email: string;
  name: string;
  picture: string;
}

export const authService = {
  /**
   * Handles Google OAuth login:
   * 1. Verify the Google token
   * 2. Create user if not exists
   * 3. Assign all 30 tasks to new users
   * 4. Return JWT
   */
  googleLogin: async (credential: string): Promise<{ token: string; user: any }> => {
    // Verify Google credential (ID token)
    let googleUser: GoogleTokenPayload;

    try {
      const response = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
      );
      googleUser = response.data;
    } catch (error) {
      logger.error('Google token verification failed', { error });
      throw new AppError('Invalid Google credential', 401);
    }

    // Find or create user
    let user = await authRepository.findByGoogleId(googleUser.sub);
    let isNewUser = false;

    if (!user) {
      user = await authRepository.create({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.sub,
      });
      isNewUser = true;
    }

    // Assign all tasks to new user
    if (isNewUser) {
      await taskRepository.assignAllTasksToUser(user.id);
    }
    console.log(config.jwt.secret, "jwt")
    // Generate JWT (86400 seconds = 1 day)
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      config.jwt.secret,
      { expiresIn: 86400 }
    );

    return { token, user };
  },

  /** Get current user profile */
  getMe: async (userId: string) => {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  },
};
