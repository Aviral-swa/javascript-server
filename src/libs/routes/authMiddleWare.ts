import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { default as hasPermissions } from '../permissions';

export default (module: string, permissionType: string) => (req: Request, res: Response, next: NextFunction) => {
try {
    const auth = 'authorization';
    const token = req.headers[auth];
    const decodedUser = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456');
    const tokenRole = decodedUser.role;
    if (!hasPermissions(module, tokenRole, permissionType)) {
        next({
            error: 'Unathorized Access',
            status: 403
        });
    }
    next();
}
catch (err) {
    next({
        error: 'Unauthenticated Access',
        status: 403
    });

}
};
