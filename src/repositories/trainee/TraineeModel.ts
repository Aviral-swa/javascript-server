import * as mongoose from 'mongoose';
import TraineeSchema from './TraineeSchema';
import ITraineeModel from './ITraineeModel';

export const traineeSchema = new TraineeSchema({
    collection: 'trainee',
});
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 0
 *         name:
 *           type: string
 *           example: tranee1
 *         email:
 *           type: string
 *           example: trainee1@ex.com
 *         password:
 *           type: string
 *           example: inHash-4289h2d482f4h2d
 *         role:
 *           type: string
 *           example: trainee
 *         createdAt:
 *           type: string
 *           example: 2020-11-24 09-37-32.796Z
 *     ApiSuccess:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: operation successful
 *         data:
 *           type: object
 *           $ref: '#/components/schemas/user'
 *         status:
 *           type: string
 *           example: success
 *     ApiError:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: err
 *         message:
 *           type: string
 *           example: not found
 *         status:
 *           type: integer
 *           example: 404
 *         timeStamp:
 *           type: string
 *           example: 2020-11-24 09-37-32.796Z
 *     delApiSuccess:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: trainee deleted succesfully
 *         data:
 *           type: object
 *           example: {}
 *         status:
 *           type: string
 *           example: success
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export const traineeModel: mongoose.Model<ITraineeModel> = mongoose.model<ITraineeModel>(
    'Trainee',
    traineeSchema,
    'Trainee',
    true,
);
