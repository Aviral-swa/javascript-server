import { Router } from 'express';
import TraineeController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const traineeRouter = Router();

traineeRouter.route('/')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(config.get), TraineeController.get)
    .post(validationHandler(config.post), TraineeController.post)
    .put(validationHandler(config.put), TraineeController.put)
    .delete(validationHandler(config.delete), TraineeController.delete);

traineeRouter.route('/:id')
    .delete(validationHandler(config.delete), TraineeController.delete);

export default traineeRouter;
