import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { configuration } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../../libs/interfaces';
import { payload } from './constants';

class UserController {

    static instance: UserController;

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }

        UserController.instance = new UserController();
        return UserController.instance;
    }

   me(req: IRequest, res: Response, next: NextFunction) {
        try {
            console.log('inside me method');
            delete req.user.password;
            res.status(200).send({
                message: 'users fethed successfully',
                data: [
                    {
                        user: req.user
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

    login(req: IRequest, res: Response, next: NextFunction) {
        try {
            const secretKey = configuration.secret_key;
            payload.email = req.body.email;
            payload.password = req.body.password;
            UserRepository.findOne({password: req.body.password, email: req.body.email})
            .then((data) => {
                if (data === null) {
                    next({
                        message: 'user not found',
                        error: 'Unauthorized Access',
                        status: 403
                    });
                }
                else {
                    const token = jwt.sign(payload, secretKey);
                    res.status(200).send({
                        message: 'token created successfully',
                        data: {
                                generated_token: token
                            },
                        status: 'success'
                    });
                }})
                .catch((err) => {
                    console.log(err);
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
