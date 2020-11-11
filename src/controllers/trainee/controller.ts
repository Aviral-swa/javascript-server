import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import { ICreate } from '../../libs/interfaces';

class TraineeController {

    static instance: TraineeController;

    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }

        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }

    get(req: Request, res: Response, next: NextFunction) {
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

    create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside post method');
            const extractUser: UserRepository = new UserRepository();
            extractUser.createUsers(req.body);
        }
        catch (err) {
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
            res.status(200).send({
                message: 'trainee created successfully',
                data: {
                        Trainee: req.body,
                    },
                status: 'success'
            });
    }

    update(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside put method');
            const extractUser: UserRepository = new UserRepository();
            extractUser.update(req.body);

            res.status(200).send({
                message: 'trainees updated successfully',
                data: {
                        updated: req.body,
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
            const extractUser: UserRepository = new UserRepository();
            extractUser.delete(req.params.id);

            res.status(200).send({
                message: 'trainee deleted successfully',
                data: {
                        originalId: req.params.id
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

export default TraineeController.getInstance();
