import { Router } from 'express';
import TraineeController from './controller';

const traineeRouter = Router();

traineeRouter.route('/')
    .get(TraineeController.get)
    .post(TraineeController.post)
    .put(TraineeController.put)
    .delete(TraineeController.delete);

export default traineeRouter;