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

            res.status(200).send({
                message: 'trainees fethed successfully',
                data: [
                    {
                        name: 'Aviral Swarnkar',
                        address: 'Noida'
                    }
                ],
                status: 'success'
            });
        }
        catch (err) {
            // TO DO: will ship below logic in next assignment

            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
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
            // TO DO: will ship below logic in next assignment

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

            res.send({
                message: 'trainees updated successfully',
                data: {
                        name: 'Mudit Rajput',
                        address: 'Bijnor'
                    },
                status: 'success'
            });
        }
        catch (err) {
            // TO DO: will ship below logic in next assignment

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
            // TO DO: will ship below logic in next assignment

            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }
}

export default TraineeController.getInstance();
