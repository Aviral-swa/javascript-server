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
            const { skip, limit, sort, sortOrder, searchString } = res.locals;
            let column = 'name';
            const emailRegex = /@[a-z]+[.][a-z]+/i;
            if (searchString && (emailRegex.test(searchString))) {
                column = 'email';
            }
            const options = {
                skip,
                limit,
                sort: { [sort]: sortOrder }
            };
            const regexSearch = new RegExp(searchString, 'gi');
            const result = this.traineeRepository.get({[column]: regexSearch} || {}, options);
            const countTotal = this.traineeRepository.count({});
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
            const createdUser = await this.traineeRepository.create(newUser);
            res.status(200).send({
                message: 'trainee created successfully',
                data: createdUser,
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
            let newPassword;
            const { dataToUpdate: {password, ...rest}, originalId } = req.body;
            if (password) {
                newPassword = await createHash(password);
            }
            const newUser = { originalId, dataToUpdate: { password: newPassword, ...rest }};
            const updatedUser = await this.traineeRepository.update(newUser);
            if (!updatedUser) {
                return next({
                    error: 'invalid originalId',
                    message: 'trainee not found ',
                    status: 404
                });
            }
            res.status(200).send({
                message: 'trainees updated successfully',
                data: updatedUser,
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
