import { Request, Response, NextFunction } from 'express';
import EmployeeRepo from '../../repositories/employee/EmployeeRepo';
import IEmployee from '../../entities/IEmployee';
import constants from './constants';

class EmployeeController {

    static instance: EmployeeController;

    static getInstance() {
        if (EmployeeController.instance) {
            return EmployeeController.instance;
        }

        EmployeeController.instance = new EmployeeController();
        return EmployeeController.instance;
    }
    private employeeRepository: EmployeeRepo;
    constructor() {
        this.employeeRepository = new EmployeeRepo();
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const { errorMessages, successMessages } = constants;
        try {
            console.log('inside post method');
            const employeeToCreate: IEmployee[] = await this.employeeRepository.get({ name: req.body.name });
            if (employeeToCreate.length) {
                return next({
                    error: errorMessages.DUPLICATE_REQUEST,
                    message: errorMessages.DUPLICATE_REQUEST_MESSAGE,
                    status: 400
                });
            }
            const createdEmployee: IEmployee = await this.employeeRepository.create(req.body);
            if (!createdEmployee) {
                return next({
                    error: errorMessages.INVALID_PARENT,
                    message: errorMessages.INVALID_PARENT_MESSAGE,
                    status: 400
                });
            }
            res.status(200).send({
                message: successMessages.SUCCESSFULL_CREATION,
                data: createdEmployee,
                status: successMessages.SUCCESS_STATUS
            });
        }
        catch (err) {
            console.log('err', err);
            return next({
                error: errorMessages.BAD_RESQUEST,
                message: err,
                status: 400
            });
        }
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        const { errorMessages, successMessages } = constants;
        try {
            console.log('inside get method');
            const employees: IEmployee[] = await this.employeeRepository.get({});
            const countTotal: number = await this.employeeRepository.count();
            if (! countTotal) {
                return next({
                    error: errorMessages.NO_DATA,
                    message: errorMessages.NOT_FOUND_MESSAGE,
                    status: 404
                });
            }
                res.status(200).send({
                message: successMessages.SUCCESSFULLY_FETCHED,
                data: {
                    total: countTotal,
                    employees
                },
                status: successMessages.SUCCESS_STATUS
            });

        }
        catch (err) {

            return next({
                error: errorMessages.BAD_RESQUEST,
                message: err,
                status: 400
            });
        }
    }
}

export default EmployeeController.getInstance();
