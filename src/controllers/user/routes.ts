import { Router } from 'express';
import UserController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter = Router();
userRouter.route('/me')
    /**
     * @swagger
     * /user/me:
     *   get:
     *     tags:
     *       - user
     *     summary: Profile fetch of the current user
     *     responses:
     *       '200':
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/ApiSuccess'
     *       '400':
     *         description: Invalid username / password supplied
     *         schema:
     *           $ref: '#/definitions/ApiError'
     *     security:
     *       - ApiKeyAuth: []
     */
    .get(authMiddleWare('trainee', 'read'), validationHandler(config.get), UserController.me);
userRouter.route('/login')
    /**
     * @swagger
     * /user/login:
     *   post:
     *     tags:
     *       - user
     *     summary: Logs user into the system
     *     parameters:
     *       - name: data
     *         in: body
     *         example:
     *           email: example@successive.tech
     *           password: gtf66fh
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required: true
     *     responses:
     *       '200':
     *         description: successful operation
     *         schema:
     *           $ref: '#/definitions/Login'
     *       '400':
     *         description: Invalid username / password supplied
     *         schema:
     *           $ref: '#/definitions/ApiError'
     */
    .post(validationHandler(config.post), UserController.login);

export default userRouter;