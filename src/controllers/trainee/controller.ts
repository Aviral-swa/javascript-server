import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
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
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }


    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside get method');
            const page = parseInt(req.query.page as string, 10) || 1 ;
            const limit = parseInt(req.query.limit as string, 10) || 2;
            const skip = (page - 1) * limit;
            const data = await this.userRepository.get({}, skip, limit);
            const count = data.length;
                res.status(200).send({
                message: 'trainees fethed successfully',
                data: [
                    {
                        totalCount: count,
                        allUsers: data
                    }
                ],
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
            this.userRepository.create(req.body);
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

    public update = (req: Request, res: Response, next: NextFunction) =>  {
        try {
            console.log('inside put method');
            this.userRepository.update(req.body);
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

    public delete = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside delete method');
            this.userRepository.delete(req.params.id);
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
