import { Request, Response, NextFunction } from 'express';
import { IRequest } from '../../libs/interfaces';
import TraineeRepository from '../../repositories/trainee/TraineeRepository';
import PermissionsRepository from '../../repositories/permissions/PermissionsRepository';
import { createHash } from '../../libs/helper';
import { ITrainee } from '../../entities';
import { traineepermissionSeedData } from '../../libs/constants';
import IPermissions  from '../../entities/IPermissions';
import constants from './constants';

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
                    message: constants.errorMessages.NO_TRAINEES,
                    data: {
                        total: totalCount,
                        showing: usersInPage,
                        traineesList: [],
                    },
                    status: constants.successMessages.SUCCESS_STATUS
                });
            }
                res.status(200).send({
                message: constants.successMessages.SUCCESSFULLY_FETCHED,
                data: {
                    total: totalCount,
                    showing: usersInPage,
                    traineesList: trainees,
                },
                status: constants.successMessages.SUCCESS_STATUS
            });

        }
        catch (err) {

            return next({
                error: constants.errorMessages.BAD_RESQUEST,
                message: err,
                status: 400
            });
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('inside post method');
            const { password, email, ...rest }  = req.body;
            const traineeToCreate: ITrainee = await this.traineeRepository.findOne({ email });
            if (traineeToCreate) {
                return next({
                    error: constants.errorMessages.DUPLICATE_REQUEST,
                    message: constants.errorMessages.DUPLICATE_REQUEST_MESSAGE,
                    status: 400
                });
            }
            const hashPass = await createHash(password);
            const { role } = res.locals;
            const newUser = {...rest, email, password: hashPass, role};
            const createdUser: ITrainee = await this.traineeRepository.create(newUser);
            traineepermissionSeedData.email = createdUser.email;
            this.permissionRepo.create(traineepermissionSeedData);
            res.status(200).send({
                message: constants.successMessages.SUCCESSFULLY_CREATED,
                data: createdUser,
                status: constants.successMessages.SUCCESS_STATUS
            });
        }
        catch (err) {
            return next({
                error: constants.errorMessages.BAD_RESQUEST,
                message: err,
                status: 400
            });
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) =>  {
        try {
            console.log('inside put method');
            let newPassword: string;
            const { dataToUpdate: { password } } = req.body;
            if (password) {
                newPassword = await createHash(password);
                req.body.dataToUpdate.password = newPassword;
            }
            const updatedUser: ITrainee = await this.traineeRepository.update(req.body);
            if (!updatedUser) {
                return next({
                    error: constants.errorMessages.INVALID_ID,
                    message: constants.errorMessages.NOT_FOUND,
                    status: 404
                });
            }
            res.status(200).send({
                message: constants.successMessages.SUCCESSFULL_UPDATE,
                data: updatedUser,
                status: constants.successMessages.SUCCESS_STATUS
            });
        }
        catch (err) {
            return next({
                error: constants.errorMessages.BAD_RESQUEST,
                message: err,
                status: 400
            });
        }
    }

    public delete = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            console.log('inside delete method');
            const delTrainee: ITrainee = await this.traineeRepository.findOne({originalId: req.params.id});
            const delTraineePermission: IPermissions = await this.permissionRepo.findOne({email: delTrainee.email});
            if (req.user.originalId === req.params.id) {
                return next({
                    error: 'bad request',
                    message: 'You cannot delete yourself',
                    status: 404
                });
            }
            const deletedTrainee: ITrainee = await this.traineeRepository.delete(req.params.id);
            if (!deletedTrainee) {
                return next({
                    error: constants.errorMessages.INVALID_ID,
                    message: constants.errorMessages.NOT_FOUND,
                    status: 400
                });
            }
            this.permissionRepo.delete(delTraineePermission.originalId);
            res.status(200).send({
                message: constants.successMessages.SUCCESSFULLY_DELETED,
                data: req.params.id,
                status: constants.successMessages.SUCCESS_STATUS
            });
        }
        catch (err) {
            return next({
                error: constants.errorMessages.BAD_RESQUEST,
                message: err,
                status: 400
            });
        }
    }
}

export default TraineeController.getInstance();
