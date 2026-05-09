import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { googleLoginSchema } from './auth.validation';

const router = Router();

router.post('/google', validate(googleLoginSchema), authController.googleLogin);
router.get('/me', authenticate, authController.getMe);

export default router;
