import { Router } from 'express';
import TraineeController from './controller';
import config from './validation';
import validationHandler from '../../libs/validationHandler';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const traineeRouter = Router();

traineeRouter.route('/')
    /**
     * @swagger
     * /trainee/:
     *   get:
     *     summary: Finds trainees
     *     description: Multiple query values can be provided in query params like skip, limit, sort, search.
     *     parameters:
     *       - name: skip
     *         in: query
     *         description: Pagination- the number of documents to skip.
     *         required: false
     *         schema:
     *           type: number
     *           default: available
     *       - name: limit
     *         in: query
     *         description: Pagination- the maximum number of documents per page.
     *         required: false
     *         schema:
     *           type: number
     *           default: available
     *       - name: sort
     *         in: query
     *         description: the column name to sort for
     *         required: false
     *         schema:
     *           type: number
     *           default: available
     *       - name: sortOrder
     *         in: query
     *         description: 1 for ascending and -1 for decending
     *         required: false
     *         schema:
     *           type: number
     *           default: available
     *       - name: search
     *         in: query
     *         description: Status values that need to be considered for filter
     *         required: false
     *         schema:
     *           type: number
     *           default: available
     *     responses:
     *       '200':
     *         description: successful operation
     *         schema:
     *           $ref: '#/components/schemas/ApiSuccess'
     *       '400':
     *         description: Invalid status value
     *         schema:
     *           $ref: '#/components/schemas/ApiError'
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - trainee
     */
    .get(authMiddleWare('getUsers', 'read'), validationHandler(config.get), TraineeController.get)
    /**
     * @swagger
     * /trainee/:
     *   post:
     *     summary: Creates a trainee
     *     parameters:
     *       - name: data
     *         in: body
     *         example:
     *           email: example@cc.tech
     *           password: zxcv
     *           name: test
     *           role: trainer
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required: true
     *     responses:
     *       '200':
     *         description: successful operation
     *         schema:
     *           $ref: '#/components/schemas/ApiSuccess'
     *       '400':
     *         description: Invalid status value
     *         schema:
     *           $ref: '#/components/schemas/ApiError'
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - trainee
     */
    .post(authMiddleWare('getUsers', 'write'), validationHandler(config.create), TraineeController.create)
    /**
     * @swagger
     * /trainee/:
     *   put:
     *      summary: Updates specific information of a trainee
     *      parameters:
     *       - name: data
     *         in: body
     *         example:
     *           originalId: 87yr77w787b
     *           dataToUpdate: {name: hh}
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               required: true
     *      responses:
     *        '200':
     *          description: successful operation
     *          schema:
     *            $ref: '#/components/schemas/ApiSuccess'
     *        '400':
     *          description: Invalid status value
     *          schema:
     *            $ref: '#/components/schemas/ApiError'
     *      security:
     *        - BearerAuth: []
     *      tags:
     *        - trainee
     */
    .put(authMiddleWare('getUsers', 'all'), validationHandler(config.update), TraineeController.update);


traineeRouter.route('/:id')
    /**
     * @swagger
     * '/trainee/:id':
     *   delete:
     *     summary: Deletes a trainee
     *     parameters:
     *       - name: originalId
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Success
     *         schema:
     *           $ref: '#/components/schemas/delApiSuccess'
     *       '404':
     *         description: Trainee not found
     *         schema:
     *           $ref: '#/components/schemas/ApiError'
     *     security:
     *       - BearerAuth: []
     *     tags:
     *       - trainee
     */
    .delete(authMiddleWare('getUsers', 'delete'), validationHandler(config.delete), TraineeController.delete);

export default traineeRouter;
