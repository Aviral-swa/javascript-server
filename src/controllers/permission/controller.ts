import { Request, Response, NextFunction } from 'express';
import PermissionRepo from '../../repositories/permissions/PermissionsRepository';
import IPermissions from '../../entities/IPermissions';
import constants from './constants';

class PermissionController {

    static instance: PermissionController;

    static getInstance() {
        if (PermissionController.instance) {
            return PermissionController.instance;
        }

        PermissionController.instance = new PermissionController();
        return PermissionController.instance;
    }
    private permissionRepo: PermissionRepo;
    constructor() {
        this.permissionRepo = new PermissionRepo();
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const { successMessages, errorMessages } = constants;
        try {
            console.log('inside put method');
            const previous: IPermissions = await this.permissionRepo.findOne({originalId: req.body.originalId});
            if (! previous) {
                return next({
                    error: errorMessages.BAD_RESQUEST,
                    message: errorMessages.NOT_FOUND,
                    status: errorMessages.ERROR_STATUS,
                });
            }
            const newData = {
                originalId: req.body.originalId,
                dataToUpdate: {
                    resources: req.body.resources,
                }
            };
            const updatedPermissions: IPermissions = await this.permissionRepo.update(newData);
            res.status(200).send({
                message: successMessages.SUCCESSFULL_UPDATE,
                data: updatedPermissions,
                status: successMessages.SUCCESS_STATUS,
            });
        }
        catch (err) {
            console.log('err', err);
            return next({
                error: errorMessages.BAD_RESQUEST,
                message: err,
                status: errorMessages.ERROR_STATUS,
            });
        }
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        const { successMessages, errorMessages } = constants;
        try {
            console.log('inside get method');
            const { email } = req.query;
            const allPermissions: IPermissions[] = await this.permissionRepo.get(
                email ? {email} : {},
                {});
                res.status(200).send({
                message: successMessages.SUCCESSFULLY_FETCHED,
                data: allPermissions,
                status: successMessages.SUCCESS_STATUS,
            });

        }
        catch (err) {

            return next({
                error: errorMessages.BAD_RESQUEST,
                message: err,
                status: errorMessages.ERROR_STATUS,
            });
        }
    }
}

export default PermissionController.getInstance();
