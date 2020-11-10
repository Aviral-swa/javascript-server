import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class TraineeController {

    static instance: TraineeController;

    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }

        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }

    getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside get method');
            const extractUser: UserRepository = new UserRepository();
            extractUser.find({}, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                        res.status(200).send({
                        message: 'trainees fethed successfully',
                        data: [
                            {
                                allUsers: data
                            }
                        ],
                        status: 'success'
                    });
                }
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

    get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside post method');

            res.status(200).send({
                message: 'trainees fetched successfully',
                data: {
                        name: 'Aviral Swarnkar',
                        address: 'Noida'
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

    createUsers(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside post method');
            const extractUser: UserRepository = new UserRepository();
            extractUser.createUsers({
                name: 'traine123',
                email: 'traine.123@successive.tech',
                role: 'trainee',
                password: 'qazwsxedc'
            });
        }
        catch (err) {
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
            res.status(200).send({
                message: 'trainees created successfully',
                data: {
                        name: 'Mudit Rajput',
                        address: 'Noida'
                    },
                status: 'success'
            });
    }

    post(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside post method');

            res.status(200).send({
                message: 'trainees created successfully',
                data: {
                        name: 'Mudit Rajput',
                        address: 'Noida'
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

    put(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside put method');

            res.status(200).send({
                message: 'trainees updated successfully',
                data: {
                        name: 'Mudit Rajput',
                        address: 'Bijnor'
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

    delete(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside delete method');

            res.status(200).send({
                message: 'trainees deleted successfully',
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
