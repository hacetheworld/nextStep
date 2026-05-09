import { Router } from 'express';
import { taskController } from './task.controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { completeTaskSchema } from './task.validation';

const router = Router();

// All task routes are protected
router.use(authenticate);

router.get('/', taskController.getAllTasks);
router.get('/today', taskController.getTodayTask);
router.post('/:taskId/complete', validate(completeTaskSchema), taskController.completeTask);

export default router;
