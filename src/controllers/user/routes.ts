import { Router } from 'express';
import UserController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter = Router();
userRouter.route('/me')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(config.get), UserController.me);
userRouter.route('/login')
    .post(validationHandler(config.post), UserController.login);

export default userRouter;