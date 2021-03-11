import { Request, Response, NextFunction } from 'express';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import PermissionsRepository from '../../repositories/permissions/PermissionsRepository';
import { createHash } from '../../libs/helper';
import { ITrainee } from '../../entities';
import { traineepermissionSeedData } from '../../libs/constants';
import IPermissions  from '../../entities/IPermissions';
class TraineeController {

    static instance: TraineeController;

    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }

        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }
    private traineeRepository: TraineeRepository;
    private permissionRepo: PermissionsRepository;
    constructor() {
        this.traineeRepository = new TraineeRepository();
        this.permissionRepo = new PermissionsRepository();
    }


    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside get method');
            const { skip, limit, sort, sortOrder, searchString } = res.locals;
            let column = 'name';
            const emailRegex = /@[a-z]+[.][a-z]+/i;
            if (searchString && (emailRegex.test(searchString))) {
                column = 'email';
            }
            const options = {
                skip,
                limit,
                sort: { [sort]: sortOrder }
            };
            const regexSearch = new RegExp(searchString, 'gi');
            const trainee: Promise<ITrainee[]> = this.traineeRepository.get({[column]: regexSearch} || {}, options);
            const countTotal: Promise<number> = this.traineeRepository.count({});
            const [totalCount, trainees ] = await Promise.all([countTotal, trainee]);
            const usersInPage: number = trainees.length;
            if (usersInPage === 0) {
                return res.status(200).send({
                    message: 'No more trainees',
                    data: {
                        total: totalCount,
                        showing: usersInPage,
                        traineesList: [],
                    },
                    status: 'success'
                });
            }
                res.status(200).send({
                message: 'trainees fethed successfully',
                data: {
                    total: totalCount,
                    showing: usersInPage,
                    traineesList: trainees,
                },
                status: 'success'
            });

        }
        catch (err) {

            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside post method');
            const { password, ...rest }  = req.body;
            const hashPass = await createHash(password);
            const { role } = res.locals;
            const newUser = {...rest, password: hashPass, role};
            const createdUser: ITrainee = await this.traineeRepository.create(newUser);
            traineepermissionSeedData.email = createdUser.email;
            this.permissionRepo.create(traineepermissionSeedData);
            res.status(200).send({
                message: 'trainee created successfully',
                data: createdUser,
                status: 'success'
            });
        }
        catch (err) {
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) =>  {
        try {
            console.log('inside put method');
            let newPassword: string;
            const { dataToUpdate: {password, ...rest}, originalId } = req.body;
            if (password) {
                newPassword = await createHash(password);
                req.body.password = newPassword;
            }
            const updatedUser: ITrainee = await this.traineeRepository.update(req.body);
            if (!updatedUser) {
                return next({
                    error: 'invalid originalId',
                    message: 'trainee not found ',
                    status: 404
                });
            }
            res.status(200).send({
                message: 'trainees updated successfully',
                data: updatedUser,
                status: 'success'
            });
        }
        catch (err) {
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside delete method');
            const delTrainee: ITrainee = await this .traineeRepository.findOne({originalId: req.params.id});
            const delTraineePermission: IPermissions = await this.permissionRepo.findOne({email: delTrainee.email});
            const deletedTrainee: ITrainee = await this.traineeRepository.delete(req.params.id);
            this.permissionRepo.delete(delTraineePermission.originalId);
            if (! deletedTrainee) {
                return next({
                    error: 'invalid originalId',
                    message: 'trainee not found ',
                    status: 404
                });
            }
            res.status(200).send({
                message: 'trainee deleted successfully',
                data: req.params.id,
                status: 'success'
            });
        }
        catch (err) {

            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }
}

export default TraineeController.getInstance();
