import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';
export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    public static getUserObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    public create(data: any): Promise<IUserModel> {
        return super.create(data);
    }
    public delete(id: string): Promise<IUserModel> {
        return super.delete(id);
    }

    public get(query: any, sort: string, sortOrder: number, skip: number, limit: number): Promise<IUserModel[]> {
        return super.get(query, sort, sortOrder, skip, limit);
    }

    public update(data: any): Promise<IUserModel> {
        return super.update(data);
    }

    public count(query: any) {
        return super.count(query);
    }

    public static findOne(query): DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }
}
