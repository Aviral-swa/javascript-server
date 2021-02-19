import { Request, Response, NextFunction } from 'express';
import EmployeeRepo from '../../repositories/employee/EmployeeRepo';
import Iemployee from '../../entities/IEmployee';

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
        try {
            console.log('inside post method');
            const createdEmployee: Iemployee = await this.employeeRepository.create(req.body);
            if (! createdEmployee) {
                return next({
                    error: 'Invalid parent',
                    message: 'Parent does not exist',
                    status: 400
                });
            }
            res.status(200).send({
                message: 'Employee created successfully',
                data: createdEmployee,
                status: 'success'
            });
        }
        catch (err) {
            console.log('err', err);
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside get method');
            const employees: Iemployee[] = await this.employeeRepository.get({});
            const countTotal: number = await this.employeeRepository.count();
            if (! countTotal) {
                return next({
                    error: 'No data',
                    message: 'No employees found',
                    status: 404
                });
            }
                res.status(200).send({
                message: 'Employees fethed successfully',
                data: {
                    total: countTotal,
                    employees
                },
                status: 'success'
            });

        }
        catch (err) {

            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }
}

export default EmployeeController.getInstance();
