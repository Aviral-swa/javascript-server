import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
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

    async login(req: IRequest, res: Response, next: NextFunction) {
        try {
            console.log('inside login method');
            const secretKey = configuration.secret_key;
            payload.email = req.body.email;
            const data = await UserRepository.findOne({email: req.body.email});
            if (data === null) {
                next({
                    message: 'Email is not registered',
                    error: 'Unauthorized Access',
                    status: 403
                });
            }
            const match = await bcrypt.compare(req.body.password, data.password);
            if (match) {
                const token = jwt.sign(payload, secretKey, { expiresIn: '900s' });
                res.status(200).send({
                    message: 'token created successfully',
                    data: {
                            generated_token: token
                        },
                    status: 'success'
                });
            }
            else {
                next({
                    message: 'Password is incorrect',
                    error: 'Unauthorized Access',
                    status: 403
                });
            }

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
