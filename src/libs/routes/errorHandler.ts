import { Response, Request, NextFunction } from 'express';
import IError from './IError';

export default (err: IError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) { return next(err); }
    const { message, status, error } = err;
    const result = {
        error: error || 'undefined',
        message: message || 'error',
        status: status || 500,
        timestamp: new Date(),
    };
    res.status(result.status).json(result);
};
