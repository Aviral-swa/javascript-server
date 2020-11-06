import { Router } from 'express';
import UserController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter = Router();

userRouter.route('/')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(config.get), UserController.get)
    .post(authMiddleWare('getUsers', 'write'), validationHandler(config.post), UserController.post)
    .put(authMiddleWare('getUsers', 'all'), validationHandler(config.put), UserController.put)
    .delete(authMiddleWare('getUsers', 'delete'), validationHandler(config.delete), UserController.delete);

userRouter.route('/:id')
    .delete(authMiddleWare('getUsers', 'delete'), validationHandler(config.delete), UserController.delete);

export default userRouter;
