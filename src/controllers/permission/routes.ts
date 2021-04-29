import { Router } from 'express';
import PermissionController from './controller';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const permissionRouter = Router();

permissionRouter.route('/')

    /**
     * @swagger
     * /permission/:
     *   put:
     *     summary: Updates permissions
     *     description: Updates permissions for users.
     *     parameters:
     *       - name: data
     *         in: body
     *         example:
     *           name: employee 2
     *           role: trainer
     *           parent: employee 1
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required: true
     *     responses:
     *       '200':
     *         description: successful Operation
     *         schema:
     *           $ref: '#/definitions/UpdatePermissionSuccess'
     *       '400':
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/ApiError'
     *     security:
     *       - ApiKeyAuth: []
     *     tags:
     *       - permission
     */

    .put(authMiddleWare('permissions', 'update'), PermissionController.update)

    /**
     * @swagger
     * /permission/:
     *   get:
     *     summary: Returns all permissions.
     *     description: Gives permissions of each user.
     *     responses:
     *       '200':
     *         description: Successful Operation
     *         schema:
     *           $ref: '#/definitions/GetPermissionSuccess'
     *       '400':
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/ApiError'
     *     security:
     *       - ApiKeyAuth: []
     *     tags:
     *       - permission
     */

    .get(authMiddleWare('permissions', 'read'), PermissionController.get);

export default permissionRouter;
