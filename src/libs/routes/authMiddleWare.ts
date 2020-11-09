import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { default as hasPermissions } from '../hasPermissions';
import configuration from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';
import { IRequest } from '../interfaces';

export default (module: string, permissionType: string) => async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const secret_key = configuration.secret_key;
    const auth = 'authorization';
    const token = req.headers[auth];
    let dbUser;
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
        dbUser = await UserRepository.findOne({email: user.email, passsword: user.passsword});
        req.user = dbUser;
        console.log(dbUser);
        if (!hasPermissions(module, dbUser.role, permissionType)) {
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
