import { Router } from 'express';
import { progressController } from './progress.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.use(authenticate);
router.get('/', progressController.getProgress);

export default router;
