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
            const data = await this.traineeRepository.get({});
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
                data: {
                        Trainee: result,
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

    public update = async (req: Request, res: Response, next: NextFunction) =>  {
        try {
            console.log('inside put method');
            const result = await this.traineeRepository.update(req.body);
            res.status(200).send({
                message: 'trainees updated successfully',
                data: {
                        updated: result,
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

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside delete method');
            await this.traineeRepository.delete(req.params.id);
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
