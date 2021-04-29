import { Router } from 'express';
import { traineeRouter, userRouter, employeeRouter, permissionRouter } from './controllers';

const router = Router();

router.use('/trainee', traineeRouter);
router.use('/user', userRouter);
router.use('/employee', employeeRouter);
router.use('/permission', permissionRouter);

export default router;
