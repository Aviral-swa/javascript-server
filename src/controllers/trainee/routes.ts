import { Router } from 'express';
import TraineeController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';

const traineeRouter = Router();

traineeRouter.route('/')
    .get(validationHandler(config.get), TraineeController.get)
    .post(validationHandler(config.post), TraineeController.post)
    .put(validationHandler(config.put), TraineeController.put)
    .delete(validationHandler(config.delete), TraineeController.delete);

traineeRouter.route('/:id')
    .delete(validationHandler(config.delete), TraineeController.delete);

export default traineeRouter;
