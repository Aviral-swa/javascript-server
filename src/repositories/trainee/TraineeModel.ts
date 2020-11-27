import * as mongoose from 'mongoose';
import TraineeSchema from './TraineeSchema';
import ITraineeModel from './ITraineeModel';

export const traineeSchema = new TraineeSchema({
    collection: 'trainee',
});
/**
 * @swagger
 * definitions:
 *   user:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         example: 5fbf9f1827f5c2b1e17b75e2
 *       name:
 *         type: string
 *         example: tranee1
 *       email:
 *         type: string
 *         example: trainee1@successive.tech
 *       password:
 *         type: string
 *         example: $2b$10$MZogxtKcRb.1bzUmYM9r/dMJRzh0vg7/35wWAouNUi
 *       role:
 *         type: string
 *         example: trainee
 *       createdAt:
 *         type: string
 *         example: 2020-11-24 09-37-32.796Z
 *   ApiSuccess:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         example: operation successful
 *       data:
 *         type: object
 *         $ref: '#/definitions/user'
 *       status:
 *         type: string
 *         example: success
 *   ApiError:
 *     type: object
 *     properties:
 *       error:
 *         type: string
 *         example: err
 *       message:
 *         type: string
 *         example: not found
 *       status:
 *         type: integer
 *         example: 404
 *       timeStamp:
 *         type: string
 *         example: 2020-11-24 09-37-32.796Z
 *   delApiSuccess:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         example: trainee deleted succesfully
 *       data:
 *         type: object
 *         example: {}
 *       status:
 *         type: string
 *         example: success
 *   Login:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         example: Operation Successfull
 *       data:
 *         $ref: '#/definitions/Token'
 *       status:
 *         type: string
 *         example: success
 *   Token:
 *     type: object
 *     properties:
 *       token:
 *         type: string
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTdWNjZXNzaXZlIFRlY2hub2xvZ2llcyIsImF1ZCI6Ind3dy5zdWNjZXNzaXZlLmluIiwic3ViIjoiTGVhcm4gYW5kIEltcGxlbWVudCIsImVtYWlsIjoiaGVhZC50cmFpbmVyQHN1Y2Nlc3NpdmUudGVjaCIsImlhdCI6MTYwNjQwMzI2OCwiZXhwIjoxNjA2NDA0MTY4fQ.0qVPgXSpMpJLK5TqwFTjzb5ADN589PmPOrk30Uuoado"
 *   getApiExample:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         example: trainees fetched successfully
 *       data:
 *         $ref: '#/definitions/userWithCount'
 *   userWithCount:
 *     type: object
 *     properties:
 *        totalCount:
 *          type: integer
 *          example: 4
 *        usersInPage:
 *          type: integer
 *          example: 2
 *        traineesList:
 *          type: array
 *          items:
 *            $ref: '#/definitions/user'
 * securityDefinitions:
 *   ApiKeyAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

export const traineeModel: mongoose.Model<ITraineeModel> = mongoose.model<ITraineeModel>(
    'Trainee',
    traineeSchema,
    'Trainee',
    true,
);
