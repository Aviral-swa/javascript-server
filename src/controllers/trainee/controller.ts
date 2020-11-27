import { Request, Response, NextFunction } from 'express';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import { createHash } from '../../libs/helper';
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
            const { skip, limit, sort, sortOrder } = res.locals;
            const searchString = req.query.search as string;
            let column = '';
            const nameRegex = /[a-z]+$/i;
            const emailRegex = /@[a-z]+[.][a-z]+/i;
            if (searchString && (nameRegex.test(searchString))) {
                column = 'name';
            }
            if (searchString && (emailRegex.test(searchString))) {
                column = 'email';
            }
            const countTotal = this.traineeRepository.count({});
            const result = this.traineeRepository.get({[column]: searchString}, sort, sortOrder, skip, limit);
            const [totalCount, trainees ] = await Promise.all([countTotal, result]);
            const usersInPage = trainees.length;
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
                    traineesList: trainees,
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
            const { password, ...rest }  = req.body;
            const hashPass = await createHash(password);
            const newUser = {...rest, password: hashPass};
            const result = await this.traineeRepository.create(newUser);
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
                req.body.dataToUpdate.password = await createHash(newPassword);
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
