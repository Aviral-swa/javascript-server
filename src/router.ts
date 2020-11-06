import { Router } from 'express';
import { traineeRouter } from './controllers';
import { userRouter } from './controllers';

const router = Router();

router.use('/trainee', traineeRouter);
router.use('/user', userRouter);

export default router;
