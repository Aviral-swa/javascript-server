import { Router } from 'express';
import EmployeeController from './controller';

const employeeRouter = Router();

employeeRouter.route('/')
    /**
     * @swagger
     * /employee/:
     *   post:
     *     summary: Creates a employee
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
     *           $ref: '#/definitions/PostApiSuccess'
     *       '400':
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/ApiError'
     *     tags:
     *       - employee
     */
    .post(EmployeeController.create)
    /**
     * @swagger
     * /employee/:
     *   get:
     *     summary: Finds employees
     *     description: Gives a total count of employees in database and fetches all the data.
     *     responses:
     *       '200':
     *         description: Successful Operation
     *         schema:
     *           $ref: '#/definitions/GetApiSuccess'
     *       '400':
     *         description: Bad Request
     *         schema:
     *           $ref: '#/definitions/ApiError'
     *     tags:
     *       - employee
     */
    .get(EmployeeController.get);

export default employeeRouter;
