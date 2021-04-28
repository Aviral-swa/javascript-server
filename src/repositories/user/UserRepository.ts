import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';
import { ICreate, IQuery, IUpdate } from '../../libs/interfaces';
export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    public create(data: ICreate): Promise<IUserModel> {
        return super.create(data);
    }
    public delete(id: string): Promise<IUserModel> {
        return super.delete(id);
    }

    public get(query: IQuery, options: any): Promise<IUserModel[]> {
        return super.get(query, options);
    }

    public update(data: IUpdate): Promise<IUserModel> {
        return super.update(data);
    }

    public count(query: IQuery) {
        return super.count(query);
    }

    public static findOne(query: IQuery): Promise<IUserModel> {
        return userModel.findOne(query).lean();
    }
}
