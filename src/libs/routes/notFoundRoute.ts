import { Response, Request, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    next({
        error: 'not found',
        status: 404,
        message: 'Error: Invalid Route'
    });
};
