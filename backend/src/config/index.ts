import dotenv from 'dotenv';
import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.join(process.cwd(), '.env') });
export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  database: {
    url: process.env.DATABASE_URL!,
  },

  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },

  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
} as const;
