import * as mongoose from 'mongoose';
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
        const id = UserRepository.getUserObjectId();
        const model = new userModel({
            _id: id,
            originalId: id,
            ...data,
        });
        return model.save();
    }

    public count() {
        return userModel.countDocuments();
    }

    public static findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    // public findAll(query: any, projection: any, options: any): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
    //     const finalQuery = {deletedAt: undefined, ...query};
    //     return this.find(finalQuery, projection, options);
    // }
}
