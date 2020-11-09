import { Router } from 'express';
import UserController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter = Router();
userRouter.route('/me')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(config.get), UserController.get);
userRouter.route('/login')
    .post(validationHandler(config.post), UserController.create);
userRouter.route('/')
    .put(authMiddleWare('getUsers', 'all'), validationHandler(config.put), UserController.put)
    .delete(authMiddleWare('getUsers', 'delete'), validationHandler(config.delete), UserController.delete);

userRouter.route('/:id')
    .delete(authMiddleWare('getUsers', 'delete'), validationHandler(config.delete), UserController.delete);

export default userRouter;
