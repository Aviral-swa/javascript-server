import { Router } from 'express';
import { traineeRouter, userRouter, employeeRouter } from './controllers';

const router = Router();

router.use('/trainee', traineeRouter);
router.use('/user', userRouter);
router.use('/employee', employeeRouter);

export default router;
