import { Request, Response, NextFunction } from 'express';

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

            res.send({
                message: 'trainees fethed successfully',
                data: [
                    {
                        name: 'Aviral Swarnkar',
                        address: 'Noida'
                    }
                ]
            });
        }
        catch (err) {
            console.log('inside error', err);
        }
    }
    post(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside post method');

            res.send({
                message: 'trainees created successfully',
                data: {
                        name: 'Mudit Rajput',
                        address: 'Noida'
                    }
            });
        }
        catch (err) {
            console.log('inside error', err);
        }
    }

    put(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside put method');

            res.send({
                message: 'trainees updated successfully',
                data: {
                        name: 'Mudit Rajput',
                        address: 'Noida'
                    }
            });
        }
        catch (err) {
            console.log('inside error', err);
        }
    }

    delete(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside delete method');

            res.send({
                message: 'trainees deleted successfully',
                data: {
                        name: '',
                        address: ''
                    }
            });
        }
        catch (err) {
            console.log('inside error', err);
        }
    }
}

export default TraineeController.getInstance();