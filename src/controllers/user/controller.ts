import { Request, Response, NextFunction } from 'express';

class UserController {

    static instance: UserController;

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }

        UserController.instance = new UserController();
        return UserController.instance;
    }

    get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('inside get method');

            res.status(200).send({
                message: 'users fethed successfully',
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
                message: 'users created successfully',
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
                message: 'users updated successfully',
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
                message: 'users deleted successfully',
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

export default UserController.getInstance();
