import { Router } from 'express';
import EmployeeController from './controller';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const employeeRouter = Router();

employeeRouter.route('/')

    /**
     * @swagger
     * /employee/:
     *   post:
     *     summary: Creates a employee
     *     description: Creates an employee (Node) by accepting 3 parameters - name, role, parent.
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
     *     security:
     *       - ApiKeyAuth: []
     *     tags:
     *       - employee
     */

    .post(authMiddleWare('employee', 'create'), EmployeeController.create)

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
     *     security:
     *       - ApiKeyAuth: []
     *     tags:
     *       - employee
     */

    .get(authMiddleWare('employee', 'read'), EmployeeController.get);

export default employeeRouter;
