import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tasks = [
  {
    day: 1,
    title: 'Environment Setup & Node.js Basics',
    description: 'Set up your development environment and learn Node.js fundamentals.',
    focus: ['Node.js', 'npm', 'Environment Setup'],
    steps: ['Install Node.js and npm', 'Initialize a Node.js project with npm init', 'Create a basic script that logs to console', 'Understand package.json structure'],
    successCriteria: ['Node.js and npm installed', 'Project initialized', 'Basic script runs successfully'],
    submissionType: 'github',
  },
  {
    day: 2,
    title: 'Express.js Server Setup',
    description: 'Build your first Express.js server with basic routing.',
    focus: ['Express.js', 'HTTP', 'Routing'],
    steps: ['Install Express.js', 'Create a basic server', 'Add GET routes', 'Test with browser or Postman'],
    successCriteria: ['Server runs on localhost', 'Routes return correct responses', 'Code pushed to GitHub'],
    submissionType: 'github',
  },
  {
    day: 3,
    title: 'RESTful API Design',
    description: 'Learn REST principles and build CRUD endpoints.',
    focus: ['REST', 'CRUD', 'API Design'],
    steps: ['Understand REST principles', 'Create CRUD routes for a resource', 'Use proper HTTP methods', 'Handle request body with express.json()'],
    successCriteria: ['All CRUD endpoints work', 'Proper status codes used', 'JSON responses returned'],
    submissionType: 'github',
  },
  {
    day: 4,
    title: 'MongoDB Setup & Mongoose',
    description: 'Connect to MongoDB and create your first Mongoose model.',
    focus: ['MongoDB', 'Mongoose', 'Database'],
    steps: ['Set up MongoDB Atlas account', 'Install Mongoose', 'Create connection', 'Define a Mongoose schema and model'],
    successCriteria: ['Connected to MongoDB', 'Model created', 'Basic operations work'],
    submissionType: 'github',
  },
  {
    day: 5,
    title: 'CRUD with MongoDB',
    description: 'Implement full CRUD operations with Mongoose.',
    focus: ['Mongoose CRUD', 'Controllers'],
    steps: ['Create documents', 'Read documents with filters', 'Update documents', 'Delete documents'],
    successCriteria: ['All CRUD operations functional', 'Error handling implemented', 'Data persists in MongoDB'],
    submissionType: 'github',
  },
  {
    day: 6,
    title: 'Error Handling & Middleware',
    description: 'Implement proper error handling and custom middleware.',
    focus: ['Middleware', 'Error Handling'],
    steps: ['Create custom error class', 'Build error handling middleware', 'Add logging middleware', 'Implement async error wrapper'],
    successCriteria: ['Centralized error handling works', 'Custom middleware runs', 'Errors return proper responses'],
    submissionType: 'github',
  },
  {
    day: 7,
    title: 'Authentication - JWT Basics',
    description: 'Implement JWT-based authentication.',
    focus: ['JWT', 'Authentication', 'bcrypt'],
    steps: ['Install jsonwebtoken and bcryptjs', 'Create user registration', 'Create login endpoint', 'Generate and verify JWT'],
    successCriteria: ['Users can register', 'Login returns JWT', 'Password properly hashed'],
    submissionType: 'github',
  },
  {
    day: 8,
    title: 'Protected Routes & Auth Middleware',
    description: 'Create auth middleware to protect routes.',
    focus: ['Auth Middleware', 'Protected Routes'],
    steps: ['Create auth middleware', 'Protect specific routes', 'Extract user from token', 'Handle unauthorized access'],
    successCriteria: ['Protected routes require token', 'Unauthorized requests rejected', 'User info available in routes'],
    submissionType: 'github',
  },
  {
    day: 9,
    title: 'Input Validation & Sanitization',
    description: 'Add request validation and data sanitization.',
    focus: ['Validation', 'Security', 'Yup/Joi'],
    steps: ['Install validation library', 'Create validation schemas', 'Validate request bodies', 'Sanitize user input'],
    successCriteria: ['Invalid inputs rejected', 'Proper error messages returned', 'XSS prevention in place'],
    submissionType: 'github',
  },
  {
    day: 10,
    title: 'File Upload & Static Files',
    description: 'Handle file uploads and serve static files.',
    focus: ['Multer', 'File Upload', 'Static Files'],
    steps: ['Install Multer', 'Configure file upload', 'Handle image uploads', 'Serve uploaded files'],
    successCriteria: ['Files upload successfully', 'File size limits enforced', 'Static files served'],
    submissionType: 'github',
  },
  {
    day: 11,
    title: 'React Setup & Components',
    description: 'Initialize React with Vite and create first components.',
    focus: ['React', 'Vite', 'Components'],
    steps: ['Create React app with Vite', 'Understand JSX', 'Create functional components', 'Use props'],
    successCriteria: ['React app runs', 'Components render', 'Props passed correctly'],
    submissionType: 'github',
  },
  {
    day: 12,
    title: 'React State & Events',
    description: 'Learn useState, event handling, and conditional rendering.',
    focus: ['useState', 'Events', 'Conditional Rendering'],
    steps: ['Use useState hook', 'Handle click events', 'Implement form handling', 'Conditional rendering'],
    successCriteria: ['State updates correctly', 'Events handled', 'UI responds to state changes'],
    submissionType: 'github',
  },
  {
    day: 13,
    title: 'React useEffect & API Calls',
    description: 'Fetch data from your API using useEffect and Axios.',
    focus: ['useEffect', 'Axios', 'Data Fetching'],
    steps: ['Install Axios', 'Create API service', 'Fetch data on mount', 'Handle loading and errors'],
    successCriteria: ['Data fetched from API', 'Loading state shown', 'Errors handled gracefully'],
    submissionType: 'github',
  },
  {
    day: 14,
    title: 'React Router & Navigation',
    description: 'Add client-side routing with React Router.',
    focus: ['React Router', 'Navigation', 'SPA'],
    steps: ['Install React Router', 'Create route configuration', 'Add navigation links', 'Create protected routes'],
    successCriteria: ['Routes work correctly', 'Navigation smooth', 'Protected routes redirect'],
    submissionType: 'github',
  },
  {
    day: 15,
    title: 'Forms & Validation in React',
    description: 'Build forms with validation using React.',
    focus: ['Forms', 'Validation', 'UX'],
    steps: ['Create controlled forms', 'Add form validation', 'Show validation errors', 'Handle form submission'],
    successCriteria: ['Forms submit correctly', 'Validation works', 'Error messages display'],
    submissionType: 'github',
  },
  {
    day: 16,
    title: 'Context API & Global State',
    description: 'Manage global state with React Context.',
    focus: ['Context API', 'Global State'],
    steps: ['Create Auth context', 'Wrap app with provider', 'Consume context in components', 'Handle login/logout state'],
    successCriteria: ['Global state works', 'Auth state persists', 'Components access context'],
    submissionType: 'github',
  },
  {
    day: 17,
    title: 'Styling with TailwindCSS',
    description: 'Style your application with TailwindCSS.',
    focus: ['TailwindCSS', 'Responsive Design', 'UI'],
    steps: ['Install and configure TailwindCSS', 'Style components', 'Add responsive breakpoints', 'Create reusable style patterns'],
    successCriteria: ['App looks professional', 'Responsive on all sizes', 'Consistent styling'],
    submissionType: 'github',
  },
  {
    day: 18,
    title: 'Connect Frontend to Backend',
    description: 'Wire up React frontend to Express backend.',
    focus: ['Full Stack', 'CORS', 'Integration'],
    steps: ['Configure CORS on backend', 'Set up API base URL', 'Create API service layer', 'Connect auth flow end-to-end'],
    successCriteria: ['Frontend calls API', 'Auth flow works', 'Data displays correctly'],
    submissionType: 'github',
  },
  {
    day: 19,
    title: 'User Dashboard & Profile',
    description: 'Build a user dashboard and profile page.',
    focus: ['Dashboard', 'Profile', 'UX'],
    steps: ['Create dashboard layout', 'Display user info', 'Show activity/stats', 'Add profile editing'],
    successCriteria: ['Dashboard shows data', 'Profile displays correctly', 'Edit functionality works'],
    submissionType: 'github',
  },
  {
    day: 20,
    title: 'Advanced MongoDB - Relations & Population',
    description: 'Work with references and population in Mongoose.',
    focus: ['References', 'Population', 'Data Modeling'],
    steps: ['Create related models', 'Use ObjectId references', 'Implement populate', 'Handle nested data'],
    successCriteria: ['Relations work correctly', 'Population returns data', 'Queries efficient'],
    submissionType: 'github',
  },
  {
    day: 21,
    title: 'Pagination, Sorting & Filtering',
    description: 'Add pagination, sorting, and filtering to API.',
    focus: ['Pagination', 'Sorting', 'Filtering'],
    steps: ['Implement pagination logic', 'Add sorting parameters', 'Create filter system', 'Update frontend to use pagination'],
    successCriteria: ['Pagination works', 'Sorting functions', 'Filters apply correctly'],
    submissionType: 'github',
  },
  {
    day: 22,
    title: 'Image Upload with Cloudinary',
    description: 'Integrate Cloudinary for image management.',
    focus: ['Cloudinary', 'Image Processing'],
    steps: ['Set up Cloudinary account', 'Install SDK', 'Upload images to cloud', 'Display cloud images in React'],
    successCriteria: ['Images upload to Cloudinary', 'URLs stored in database', 'Images display in frontend'],
    submissionType: 'github',
  },
  {
    day: 23,
    title: 'Real-time Features with Socket.io',
    description: 'Add real-time functionality using WebSockets.',
    focus: ['Socket.io', 'Real-time', 'WebSockets'],
    steps: ['Install Socket.io', 'Set up server events', 'Connect from React', 'Build simple chat or notification'],
    successCriteria: ['Real-time connection established', 'Events emit and receive', 'UI updates in real-time'],
    submissionType: 'github',
  },
  {
    day: 24,
    title: 'Testing - Unit & Integration',
    description: 'Write tests for your backend and frontend.',
    focus: ['Jest', 'Testing', 'Quality'],
    steps: ['Install Jest/Vitest', 'Write unit tests for utilities', 'Write API integration tests', 'Achieve decent coverage'],
    successCriteria: ['Tests pass', 'Core logic tested', 'CI-ready test suite'],
    submissionType: 'github',
  },
  {
    day: 25,
    title: 'Security Best Practices',
    description: 'Harden your application with security measures.',
    focus: ['Security', 'Helmet', 'Rate Limiting'],
    steps: ['Add Helmet middleware', 'Implement rate limiting', 'Add CORS configuration', 'Sanitize all inputs'],
    successCriteria: ['Security headers set', 'Rate limiting active', 'No common vulnerabilities'],
    submissionType: 'github',
  },
  {
    day: 26,
    title: 'Environment & Configuration',
    description: 'Set up proper environment configuration and secrets management.',
    focus: ['dotenv', 'Config', 'Environments'],
    steps: ['Create environment files', 'Separate dev/prod configs', 'Use environment variables', 'Create .env.example'],
    successCriteria: ['No hardcoded secrets', 'Configs separated', 'Easy to set up'],
    submissionType: 'github',
  },
  {
    day: 27,
    title: 'Deployment - Backend to Render',
    description: 'Deploy your Express backend to Render.',
    focus: ['Deployment', 'Render', 'Production'],
    steps: ['Prepare for production', 'Create Render account', 'Connect GitHub repo', 'Deploy and test'],
    successCriteria: ['Backend deployed', 'API accessible online', 'Environment vars configured'],
    submissionType: 'github + explanation',
  },
  {
    day: 28,
    title: 'Deployment - Frontend to Vercel',
    description: 'Deploy your React frontend to Vercel.',
    focus: ['Vercel', 'Deployment', 'CI/CD'],
    steps: ['Build production bundle', 'Create Vercel account', 'Connect repository', 'Configure build settings'],
    successCriteria: ['Frontend deployed', 'Connected to backend API', 'Auto-deploy on push'],
    submissionType: 'github + explanation',
  },
  {
    day: 29,
    title: 'Performance & Optimization',
    description: 'Optimize your full-stack application.',
    focus: ['Performance', 'Optimization', 'Caching'],
    steps: ['Add database indexing', 'Implement lazy loading', 'Optimize bundle size', 'Add error boundaries'],
    successCriteria: ['Page loads fast', 'Bundle size reduced', 'No unnecessary re-renders'],
    submissionType: 'github + explanation',
  },
  {
    day: 30,
    title: 'Final Project + Interview Prep',
    description: 'Prepare for job readiness with your portfolio project.',
    focus: ['Presentation', 'Portfolio', 'Interview'],
    steps: ['Write comprehensive README', 'Prepare project explanation', 'List technical challenges', 'Practice explaining architecture decisions'],
    successCriteria: ['Project production-ready', 'You can explain everything clearly', 'README is professional'],
    submissionType: 'github + explanation',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.userTask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Insert tasks
  for (const task of tasks) {
    await prisma.task.create({
      data: {
        day: task.day,
        title: task.title,
        description: task.description,
        focus: task.focus,
        steps: task.steps,
        successCriteria: task.successCriteria,
        submissionType: task.submissionType,
      },
    });
  }

  console.log(`✅ Seeded ${tasks.length} tasks`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
