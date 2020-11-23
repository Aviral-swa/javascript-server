import { Request, Response, NextFunction } from 'express';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import * as bcrypt from 'bcrypt';
class TraineeController {

    static instance: TraineeController;

    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }

        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }
    private traineeRepository: TraineeRepository;
    constructor() {
        this.traineeRepository = new TraineeRepository();
    }


    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside get method');
            const { skip, limit } = res.locals;
            const sort  = req.query.sort as string || 'originalId';
            const sortOrder = Number(req.query.sortOrder) || -1;
            let searchString = req.query.search as string;
            let column = '';
            if (searchString) {
                const nameRegex = /[a-z]+$/i;
                const emailRegex = /@[a-z]+[.][a-z]+/i;
                if (nameRegex.test(searchString)) {
                    column = 'name';
                }
                if (emailRegex.test(searchString)) {
                    column = 'email';
                }
            }
            else {
                searchString = undefined;
                column = undefined;
            }
            const totalCount = await this.traineeRepository.count({});
            const result = await this.traineeRepository.get({[column]: searchString}, sort, sortOrder, skip, limit);
            // const tt  = await Promise.all([totalCount, result]);
            // console.log(tt);
            const usersInPage = result.length;
            if (usersInPage === 0) {
                return next({
                    error: 'bad request',
                    message: 'no records found',
                    status: 400
                });
            }
                res.status(200).send({
                message: 'trainees fethed successfully',
                data: {
                    total: totalCount,
                    showing: usersInPage,
                    result
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

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside post method');
            const hashPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashPass;
            const result = await this.traineeRepository.create(req.body);
            res.status(200).send({
                message: 'trainee created successfully',
                data: result,
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

    public update = async (req: Request, res: Response, next: NextFunction) =>  {
        try {
            console.log('inside put method');
            const newPassword = req.body.dataToUpdate.password;
            if (newPassword) {
                req.body.dataToUpdate.password = await bcrypt.hash(newPassword, 10);
            }
            const result = await this.traineeRepository.update(req.body);
            if (!result) {
                return next({
                    error: 'invalid originalId',
                    message: 'trainee not found ',
                    status: 404
                });
            }
            res.status(200).send({
                message: 'trainees updated successfully',
                data: result,
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

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside delete method');
            if (! await this.traineeRepository.delete(req.params.id)) {
                return next({
                    error: 'invalid originalId',
                    message: 'trainee not found ',
                    status: 404
                });
            }
            res.status(200).send({
                message: 'trainee deleted successfully',
                data: {},
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

export default TraineeController.getInstance();
