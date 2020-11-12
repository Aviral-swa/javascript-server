import { Router } from 'express';
import TraineeController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const traineeRouter = Router();

traineeRouter.route('/')
    .get(TraineeController.get)
    .post(TraineeController.create)
    .put(TraineeController.update);

traineeRouter.route('/:id')
    .delete(TraineeController.delete);

export default traineeRouter;
