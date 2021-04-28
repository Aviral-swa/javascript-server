import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { configuration } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import { IRequest } from '../../libs/interfaces';
import { payload } from './constants';
import { IUser } from '../../entities';

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
            const currentUser: IUser = await UserRepository.findOne({email: req.body.email});
            const currentTrainee: IUser = await TraineeRepository.findOne({email: req.body.email});
            if (!currentUser && !currentTrainee) {
                next({
                    message: 'Email is not registered',
                    error: 'Unauthorized Access',
                    status: 403
                });
            }
            const passwordMatch = await bcrypt.compare(req.body.password, (currentUser?.password || currentTrainee?.password));
            if (passwordMatch) {
                const token = jwt.sign(payload, secretKey, { expiresIn: '900s' });
                 return res.status(200).send({
                    message: 'token created successfully',
                    data: {
                            generated_token: token
                        },
                    status: 'success'
                });
            }
            next({
                message: 'Password is incorrect',
                error: 'Unauthorized Access',
                status: 403
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
