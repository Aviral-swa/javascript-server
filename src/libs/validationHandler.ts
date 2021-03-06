import { Request, Response, NextFunction } from 'express';
export default (config) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = [];
    Object.keys(config).forEach((key) => {
        const i = 0;
        const keys = config[key];
        const locations = keys.in[i];
        let request = req[locations][key];
        const regex = keys.regex;
        if ((keys.required) && !(request)) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'required'}`
                };
            return errors.push(err);
        }
        if ((!keys.required) && !(request)) {
            request = keys.default;
        }
        if (!request) {
            return;
        }
        if (
            (((keys.number) && !(Number.isInteger(Number(request)))) ||
            ((keys.string) && (!(typeof request === 'string') || Number(request))))
        ) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'incorrect Type'}`
                };
            return errors.push(err);
        }
        if ((keys.isObject) && !(typeof(request) === 'object')) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'not an Object'}`
                };
            return errors.push(err);
        }
        if ((regex) && (!regex.test(request))) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${request} invalid format`
                };
            return errors.push(err);
        }
        if (keys.number) {
            return res.locals[key] = Number(request);
        }
        res.locals[key] = request;
    });
    if (errors.length !== 0) {
        return res.status(400).send(errors);
    }
    next();
};
