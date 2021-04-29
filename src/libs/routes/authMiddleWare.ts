import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import configuration from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import { IRequest } from '../interfaces';
import { IUser, ITrainee } from '../../entities';
import { isAuthorized } from '../helper';

export default (attrb: string, permissionType: string) => async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const secret_key = configuration.secret_key;
    const auth = 'authorization';
    const token = req.headers[auth];
    let dbUser: IUser;
    let dbTrainee: ITrainee;
    if (!token) {
        next({
            message: 'Token not found',
            error: 'Authentication failed',
            status: 403,
        });
    }
    try {
        const user = jwt.verify(token, secret_key);
        if (!user) {
            next({
                message: 'user not found',
                error: 'Authentication failed',
                status: 403,
            });
        }
        dbUser = await UserRepository.findOne({email: user.email});
        dbTrainee = await TraineeRepository.findOne({email: user.email});
        req.user = dbUser || dbTrainee;
        if (!await isAuthorized((dbUser?.email || dbTrainee?.email), attrb, permissionType)) {
            next({
                message: 'permission denied',
                error: 'Unauthorized Access',
                status: 403,
            });
        }

    }
    catch (err) {
        next({
            message: 'user is unauthorized',
            error: 'Unauthorized Access',
            status: 403,
        });
    }
    next();
};
