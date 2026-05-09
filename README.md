# NextStep — 30 Days MERN Fullstack Path

A structured 30-day MERN roadmap execution platform. Login with Google, complete one task daily, submit GitHub links, and track your progress.

## Tech Stack

| Layer      | Technologies                                    |
|------------|--------------------------------------------------|
| Frontend   | React, Vite, TypeScript, TailwindCSS, Axios      |
| Backend    | Node.js, Express.js, TypeScript, Prisma ORM      |
| Database   | PostgreSQL (Supabase)                             |
| Auth       | Google OAuth 2.0, JWT                             |
| Deployment | Frontend → Vercel, Backend → Render               |

## Project Structure

```
nextStep/
├── backend/
│   ├── src/
│   │   ├── config/          # App config, Prisma client
│   │   ├── middleware/       # Auth, CORS, error handler, validation
│   │   ├── modules/
│   │   │   ├── auth/        # Google login, JWT
│   │   │   ├── task/        # Task CRUD, completion
│   │   │   └── progress/    # Progress tracking
│   │   ├── utils/           # Logger, AppError
│   │   └── index.ts         # Express app entry
│   └── prisma/
│       ├── schema.prisma    # Database schema
│       └── seed.ts          # 30 MERN tasks seed
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # TaskAccordion, etc.
│   │   ├── layouts/         # DashboardLayout
│   │   ├── pages/           # Landing, Login, Dashboard, Tasks, Progress
│   │   ├── routes/          # ProtectedRoute
│   │   ├── services/        # API service layer
│   │   ├── store/           # AuthContext
│   │   └── types/           # TypeScript interfaces
│   └── vite.config.ts
└── README.md
```

## Quick Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Google OAuth credentials ([console.cloud.google.com](https://console.cloud.google.com))

### 1. Clone & Install

```bash
git clone <repo-url> && cd nextStep

# Backend
cd backend
cp .env.example .env   # Fill in your values
npm install

# Frontend
cd ../frontend
cp .env.example .env   # Fill in your values
npm install
```

### 2. Configure Environment Variables

**Backend `.env`:**
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
JWT_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FRONTEND_URL="http://localhost:5173"
PORT=4000
NODE_ENV=development
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 3. Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed 30 tasks
npx prisma db seed
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- Health check: http://localhost:4000/health

## API Endpoints

| Method | Endpoint                  | Auth | Description              |
|--------|---------------------------|------|--------------------------|
| POST   | `/auth/google`            | No   | Login with Google token  |
| GET    | `/auth/me`                | Yes  | Get current user         |
| GET    | `/tasks`                  | Yes  | Get all tasks + status   |
| GET    | `/tasks/today`            | Yes  | Get first pending task   |
| POST   | `/tasks/:taskId/complete` | Yes  | Submit & complete task   |
| GET    | `/progress`               | Yes  | Get progress stats       |

## Business Rules

- Tasks must be completed **sequentially** (Day 1 → Day 2 → ...)
- Only the **first pending** task can be submitted
- Progress = completed tasks / 30
- On first login, all 30 tasks are assigned to the user

## Deployment

### Frontend → Vercel
1. Connect your GitHub repo
2. Set root directory to `frontend`
3. Add `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` env vars

### Backend → Render
1. Connect your GitHub repo
2. Set root directory to `backend`
3. Build command: `npm install && npx prisma generate && npm run build`
4. Start command: `npm start`
5. Add all backend env vars

### Database → Supabase
1. Create a new project
2. Copy the PostgreSQL connection string
3. Use as `DATABASE_URL` in backend

## License

MIT
