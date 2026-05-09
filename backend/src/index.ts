import dotenv from 'dotenv';


import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { correlationId } from './middleware/correlationId';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import taskRoutes from './modules/task/task.routes';
import progressRoutes from './modules/progress/progress.routes';
import logger from './utils/logger';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.frontend.url,
  credentials: true,
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, try again later' },
}));

// Body parsing
app.use(express.json());

// Correlation ID for every request
app.use(correlationId);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes);
app.use('/progress', progressRoutes);

// Centralized error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`📍 Environment: ${config.nodeEnv}`);
});

export default app;
