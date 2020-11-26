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
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ApiSuccess'
     *     security:
     *       - BearerAuth: []
     */
    .get(authMiddleWare('getUsers', 'read'), validationHandler(config.get), UserController.me);
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
     *           email: example@nx.tech
     *           password: gtf66fh
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required: true
     *     responses:
     *       '200':
     *         description: successful operation
     *         headers:
     *           X-Expires-After:
     *             description: date in UTC when token expires
     *             schema:
     *               type: string
     *               format: date-time
     *         content:
     *           application/json:
     *             schema:
     *               type: string
     *           application/xml:
     *             schema:
     *               type: string
     *       '400':
     *         description: Invalid username / password supplied
     */
    .post(validationHandler(config.post), UserController.login);

export default userRouter;