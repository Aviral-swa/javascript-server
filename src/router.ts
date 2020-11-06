import { Router } from 'express';
import { traineeRouter } from './controllers';
import { userRouter } from './controllers';

const mainRouter = Router();

mainRouter.use('/trainee', traineeRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;
