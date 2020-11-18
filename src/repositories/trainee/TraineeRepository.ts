import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import { traineeModel } from './TraineeModel';
import ITraineeModel from './ITraineeModel';
import VersionableRepository from '../versionable/VersionableRepository';
export default class TraineeRepository extends VersionableRepository<ITraineeModel, mongoose.Model<ITraineeModel>> {
    constructor() {
        super(traineeModel);
    }
    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    public create(data: any): Promise<ITraineeModel> {
        return super.create(data);
    }
    public delete(id: string): Promise<ITraineeModel> {
        return super.delete(id);
    }

    public get(query: any): Promise<ITraineeModel[]> {
        return super.get(query);
    }

    public update(data: any): Promise<ITraineeModel> {
        return super.update(data);
    }

    public count() {
        return traineeModel.countDocuments();
    }

    public static findOne(query): DocumentQuery<ITraineeModel, ITraineeModel, {}> {
        return traineeModel.findOne(query).lean();
    }
}
