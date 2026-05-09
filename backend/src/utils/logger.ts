import winston from 'winston';
import { config } from '../config';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'nextstep-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// In production, also log to file
if (config.nodeEnv === 'production') {
  logger.add(
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  );
}

export default logger;
