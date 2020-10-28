import { Response, Request, NextFunction } from 'express';
import IError from './IError';

export default (err: IError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.code).json(
        {
            error: err.error,
            message: err.message,
            status: err.code,
            timestamp: new Date()
        }
    );
};
