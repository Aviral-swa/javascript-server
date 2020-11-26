import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import { traineeModel } from './TraineeModel';
import ITraineeModel from './ITraineeModel';
import VersionableRepository from '../versionable/VersionableRepository';
import { ICreate, IQuery, IUpdate } from '../../libs/interfaces';
export default class TraineeRepository extends VersionableRepository<ITraineeModel, mongoose.Model<ITraineeModel>> {
    constructor() {
        super(traineeModel);
    }
    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    public create(data: ICreate): Promise<ITraineeModel> {
        return super.create(data);
    }
    public delete(id: string): Promise<ITraineeModel> {
        return super.delete(id);
    }

    public get(query: IQuery, sort: string, sortOrder: number, skip: number, limit: number): Promise<ITraineeModel[]> {
        return super.get(query, sort, sortOrder, skip, limit);
    }

    public update(data: IUpdate): Promise<ITraineeModel> {
        return super.update(data);
    }

    public count(query: IQuery) {
        return super.count(query);
    }

    public static findOne(query: IQuery): DocumentQuery<ITraineeModel, ITraineeModel, {}> {
        return traineeModel.findOne(query).lean();
    }
}