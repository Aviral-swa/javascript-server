import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { configuration } from '../../config';
import UserRepository from '../../repositories/user/UserRepository';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import { IRequest } from '../../libs/interfaces';
import constants, { payload } from './constants';
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
                message: constants.successMessages.SUCCESSFULLY_FETCHED,
                data: [
                    {
                        user: req.user
                    }
                ],
                status: constants.successMessages.SUCCESS_STATUS
            });
        }
        catch (err) {

            return next({
                error: constants.errorMessages.BAD_RESQUEST,
                message: err,
                status: constants.errorMessages.ERROR_STATUS
            });
        }
    }

    async login(req: IRequest, res: Response, next: NextFunction) {
        try {
            console.log('inside login method');
            const { errorMessages, successMessages } = constants;
            const secretKey = configuration.secret_key;
            payload.email = req.body.email;
            const currentUser: IUser = await UserRepository.findOne({email: req.body.email});
            const currentTrainee: IUser = await TraineeRepository.findOne({email: req.body.email});
            if (!currentUser && !currentTrainee) {
                next({
                    message: errorMessages.NOT_REGISTERED,
                    error: errorMessages.UNAUTHORIZED,
                    status: 403
                });
            }
            const passwordMatch = await bcrypt.compare(req.body.password, (currentUser?.password || currentTrainee?.password));
            if (passwordMatch) {
                const token = jwt.sign(payload, secretKey, { expiresIn: '9y' });
                 return res.status(200).send({
                    message: successMessages.SUCCESSFULLY_CREATED,
                    data: {
                            generated_token: token
                        },
                    status: successMessages.SUCCESS_STATUS
                });
            }
            next({
                message: errorMessages.INCORRECT_PASSWORD,
                error: errorMessages.UNAUTHORIZED,
                status: 403
            });

        }
        catch (err) {
            return next({
                error: constants.errorMessages.BAD_RESQUEST,
                message: err,
                status: constants.errorMessages.ERROR_STATUS
            });
        }
    }
}

export default UserController.getInstance();
