import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { default as hasPermissions } from '../hasPermissions';
import configuration from '../../config/configuration';

export default (module: string, permissionType: string) => (req: Request, res: Response, next: NextFunction) => {
    const secret_key = configuration.secret_key;
    const auth = 'authorization';
    const token = req.headers[auth];
    let user;
    if (!token) {
        next({
            message: 'Token not found',
            error: 'Authentication failed',
            status: 403
        });
    }
    try {
        user = jwt.verify(token, secret_key);
        console.log(user.role);
        if (!hasPermissions(module, user.role, permissionType)) {
            next({
                message: 'permission denied',
                error: 'Unauthorized Access',
                status: 403
            });
        }
    }
    catch (err) {
        next({
            message: 'User is unauthorized',
            error: 'Unauthorized Access',
            status: 403
        });
    }
    next();
};
