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
        if ((keys.required) && (req[locations][key] === '')) {
            const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'something went wrong'}`
                };
            errors.push(err);
        }
        if ((!keys.required) && ((req[locations][key] === ''))) {
            req[locations][key] = keys.default;
        }
        if (
            (((keys.number) && (Number.isInteger(Number(req[locations][key])))) ||
            ((keys.string) && !Number.isInteger(Number(req[locations][key])))) ||
            (!(req.params.id === ''))
        ) {
            console.log(key, 'is valid');
            console.log(req[locations][key]);
        }
        else {
             const err = {
                key: `${key}`,
                location: `${keys.in}`,
                errorMessage: `${keys.errorMessage || 'something went wrong'}`
                };
            errors.push(err);
        }
    });
    if (!(errors.length === 0)) {
        console.log(errors);
    }
    next();
};
